import { ExecArgs } from "@medusajs/framework/types";
import { ContainerRegistrationKeys, Modules, ProductStatus } from "@medusajs/framework/utils";
import { createProductsWorkflow, createProductCategoriesWorkflow } from "@medusajs/medusa/core-flows";
import * as fs from "fs";
import * as path from "path";

function parseCSV(text: string) {
    const result: any[] = [];
    const rows: string[][] = [];
    let currentRow: string[] = [];
    let currentVal = '';
    let inQuote = false;

    for (let i = 0; i < text.length; i++) {
        const char = text[i];
        if (inQuote) {
            if (char === '"') {
                if (i + 1 < text.length && text[i + 1] === '"') {
                    currentVal += '"';
                    i++; // skip escaped quote
                } else {
                    inQuote = false;
                }
            } else {
                currentVal += char;
            }
        } else {
            if (char === '"') {
                inQuote = true;
            } else if (char === ',') {
                currentRow.push(currentVal);
                currentVal = '';
            } else if (char === '\n' || (char === '\r' && i + 1 < text.length && text[i + 1] === '\n')) {
                if (char === '\r') i++; // handle \r\n
                currentRow.push(currentVal);
                rows.push(currentRow);
                currentRow = [];
                currentVal = '';
            } else if (char === '\r') {
                currentRow.push(currentVal);
                rows.push(currentRow);
                currentRow = [];
                currentVal = '';
            } else {
                currentVal += char;
            }
        }
    }
    if (currentVal || currentRow.length) {
        currentRow.push(currentVal);
        rows.push(currentRow);
    }

    if (rows.length < 2) return [];
    const headers = rows[0].map(h => h.trim().replace(/^\ufeff/, ''));

    for (let i = 1; i < rows.length; i++) {
        const row = rows[i];
        const obj: any = {};
        headers.forEach((h, index) => {
            obj[h] = row[index] || '';
        });
        result.push(obj);
    }
    return result;
}

export default async function importFinal({ container }: ExecArgs) {
    const logger = container.resolve(ContainerRegistrationKeys.LOGGER);
    const salesChannelModuleService = container.resolve(Modules.SALES_CHANNEL);
    const fulfillmentModuleService = container.resolve(Modules.FULFILLMENT);
    const query = container.resolve(ContainerRegistrationKeys.QUERY);

    const inputPath = "/Users/jrmanyeli/_Development/medusa_import_products.csv";

    if (!fs.existsSync(inputPath)) {
        logger.error(`Could not find CSV at ${inputPath}`);
        return;
    }

    const csvContent = fs.readFileSync(inputPath, "utf-8");
    const parsedData = parseCSV(csvContent);
    logger.info(`Parsed ${parsedData.length} records from CSV.`);

    // 1. Get Sales Channel
    const salesChannels = await salesChannelModuleService.listSalesChannels({});
    const salesChannel = salesChannels.find(sc => sc.name.toLowerCase().includes("quick dose")) || salesChannels[0];
    logger.info(`Using Sales Channel: ${salesChannel.name} (${salesChannel.id})`);

    // 2. Get Shipping Profile
    const [shippingProfile] = await fulfillmentModuleService.listShippingProfiles({ type: "default" });
    if (!shippingProfile) {
        logger.error("No default Shipping Profile found.");
        return;
    }

    // 3. Ensure Collections and Categories
    const { data: existingCollections } = await query.graph({ entity: "product_collection", fields: ["id", "handle"] });
    const collectionMap = new Map(existingCollections.map(c => [c.handle.toLowerCase(), c.id]));

    const { data: existingCategories } = await query.graph({ entity: "product_category", fields: ["id", "name"] });
    const categoryMap = new Map(existingCategories.map(c => [c.name.toUpperCase(), c.id]));

    const requiredCats = ["NASTY", "ELFBAR", "MOTI", "BUGATTI", "CANNABIS", "LIQUOR", "MERCH"];
    for (const catName of requiredCats) {
        if (!categoryMap.has(catName)) {
            logger.info(`Creating category: ${catName}`);
            const { result } = await createProductCategoriesWorkflow(container).run({
                input: { product_categories: [{ name: catName, is_active: true }] }
            });
            categoryMap.set(catName, result[0].id);
        }
    }

    // 4. Import Products
    let successCount = 0;
    let skipCount = 0;

    for (const row of parsedData) {
        const handle = row['Product Handle'];
        const title = row['Product Title'];
        const sku = row['Variant SKU'];
        const price = Math.round(parseFloat(row['Variant Price ZAR']) * 100);
        const catName = row['Product Category 1'] || "MERCH";
        
        const product = {
            title,
            handle,
            description: row['Product Description'],
            status: ProductStatus.PUBLISHED,
            collection_id: collectionMap.get(catName.toLowerCase()), // CSV sets Collection ID to brand handle
            category_ids: [categoryMap.get(catName.toUpperCase())],
            shipping_profile_id: shippingProfile.id,
            sales_channels: [{ id: salesChannel.id }],
            options: [{ title: "Option", values: ["Default"] }],
            variants: [
                {
                    title: "Default",
                    sku,
                    manage_inventory: false,
                    allow_backorder: true,
                    options: { "Option": "Default" },
                    prices: [{ amount: price, currency_code: "zar" }]
                }
            ],
            images: [1, 2, 3, 4, 5].map(i => row[`Product Image ${i} Url`]).filter(Boolean).map(url => ({ url }))
        };

        try {
            await createProductsWorkflow(container).run({ input: { products: [product] } });
            successCount++;
            if (successCount % 20 === 0) logger.info(`Imported ${successCount} products...`);
        } catch (err: any) {
            if (err.message?.includes("already exists") || err.message?.includes("duplicate key")) {
                skipCount++;
            } else {
                logger.error(`Failed to import ${handle}: ${err.message}`);
            }
        }
    }

    logger.info(`Import complete. New: ${successCount}, Skipped: ${skipCount}. Total records: ${parsedData.length}`);
}
