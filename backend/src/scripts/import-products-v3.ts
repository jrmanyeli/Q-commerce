import { ExecArgs } from "@medusajs/framework/types";
import { ContainerRegistrationKeys, Modules, ProductStatus } from "@medusajs/framework/utils";
import { createProductsWorkflow } from "@medusajs/medusa/core-flows";
import * as fs from "fs";
import * as path from "path";

// Define collection mapping based on the CSV's "collection" column
const collection_map: Record<string, string> = {
    'NASTY DISPENSARY': 'nasty',
    'MOTI DISPENSARY': 'moti',
    'ELFBAR DISPENSARY': 'elfbar',
    'CANNABIS DISPENSARY': 'cannabis',
    'LIQUOR DISPENSARY': 'liquor',
    'BUGATTI DISPENSARY': 'bugatti'
};

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
    const headers = rows[0].map(h => h.trim().replace(/^\ufeff/, '')); // Handle potential BOM

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

export default async function importProductsV3({ container }: ExecArgs) {
    const logger = container.resolve(ContainerRegistrationKeys.LOGGER);
    const salesChannelModuleService = container.resolve(Modules.SALES_CHANNEL);
    const fulfillmentModuleService = container.resolve(Modules.FULFILLMENT);
    const productModuleService = container.resolve(Modules.PRODUCT);

    const inputPath = "/Users/jrmanyeli/_Development/catalog_products.csv";

    if (!fs.existsSync(inputPath)) {
        logger.error(`Could not find CSV at ${inputPath}`);
        return;
    }

    logger.info(`Found CSV at ${inputPath}`);
    const csvContent = fs.readFileSync(inputPath, "utf-8");
    const parsedData = parseCSV(csvContent);
    logger.info(`Parsed ${parsedData.length} rows.`);

    // 1. Get Sales Channel
    const allSalesChannels = await salesChannelModuleService.listSalesChannels({});
    logger.info(`Available Sales Channels: ${allSalesChannels.map(sc => `'${sc.name}'`).join(", ")}`);

    const salesChannel = allSalesChannels.find(sc =>
        sc.name.toLowerCase().includes("quick dose")
    );

    if (!salesChannel) {
        logger.error("Sales channel 'Quick Dose (Pty) LTD' not found.");
        return;
    }
    logger.info(`Using Sales Channel: ${salesChannel.name} (${salesChannel.id})`);

    // 2. Get/Verify Collections
    const query = container.resolve(ContainerRegistrationKeys.QUERY);
    const { data: collections } = await query.graph({
        entity: "product_collection",
        fields: ["id", "handle"],
    });
    const collectionMap = new Map<string, string>();
    for (const c of collections) {
        collectionMap.set(c.handle, c.id);
    }

    // 3. Get Shipping Profile
    const [shippingProfile] = await fulfillmentModuleService.listShippingProfiles({
        type: "default",
    });

    if (!shippingProfile) {
        logger.error("No default Shipping Profile found.");
        return;
    }

    // 4. Transform and Import
    let successCount = 0;
    for (const row of parsedData) {
        const namePart = row['name'].toLowerCase().replace(/[^a-z0-9]+/g, '-');
        const skuPart = row['sku'].toLowerCase().replace(/[^a-z0-9]+/g, '-');
        const handle = `${namePart}-${skuPart}`.replace(/-+/g, '-').replace(/-+$/, '').trim();

        if (!handle) continue;

        const collectionHandle = collection_map[row['collection']];
        const collection_id = collectionMap.get(collectionHandle);

        const product = {
            title: row['name'],
            handle: handle,
            description: row['description'],
            status: ProductStatus.PUBLISHED,
            collection_id: collection_id,
            shipping_profile_id: shippingProfile.id,
            sales_channels: [{ id: salesChannel.id }],
            options: [{ title: "Option", values: ["Default"] }],
            variants: [
                {
                    title: "Default",
                    sku: row['sku'],
                    manage_inventory: false, // AVAILABLE IN STOCK, NOT MANAGED
                    allow_backorder: true,
                    options: { "Option": "Default" },
                    prices: [
                        {
                            amount: Math.round(parseFloat(row['price']) * 100),
                            currency_code: "zar"
                        }
                    ]
                }
            ],
            images: row['productImageUrl'] ? [{ url: `https://static.wixstatic.com/media/${row['productImageUrl']}` }] : []
        };

        try {
            logger.info(`Attempting to import: ${handle} (SKU: ${row['sku']})`);
            await createProductsWorkflow(container).run({
                input: {
                    products: [product]
                }
            });
            successCount++;
            if (successCount % 10 === 0) logger.info(`Imported ${successCount} products...`);
        } catch (err: any) {
            if (err.message && (err.message.includes("already exists") || err.message.includes("duplicate key"))) {
                logger.warn(`Skipping existing product handle: ${handle}`);
            } else if (err.message && err.message.includes("SKU")) {
                logger.error(`SKU error for ${handle}: ${err.message}`);
            } else {
                logger.error(`Failed to import ${handle}: ${err.message}`);
                console.error(err);
            }
        }
    }

    logger.info(`Import complete. Successfully imported ${successCount} products.`);
}
