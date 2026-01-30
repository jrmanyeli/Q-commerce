import { ExecArgs } from "@medusajs/framework/types";
import { ContainerRegistrationKeys, Modules, ProductStatus } from "@medusajs/framework/utils";
import { createProductsWorkflow } from "@medusajs/medusa/core-flows";
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

    // Map headers
    if (rows.length < 2) return [];
    const headers = rows[0].map(h => h.trim());

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

export default async function importProducts({ container }: ExecArgs) {
    const logger = container.resolve(ContainerRegistrationKeys.LOGGER);
    const salesChannelModuleService = container.resolve(Modules.SALES_CHANNEL);
    const fulfillmentModuleService = container.resolve(Modules.FULFILLMENT);

    // 1. Locate and read CSV
    // Try multiple locations
    const possiblePaths = [
        path.resolve(process.cwd(), "medusa_import_products_v2.csv"),
        path.resolve(process.cwd(), "medusa_import_products.csv"),
        path.resolve(process.cwd(), "../medusa_import_products.csv"),
        path.resolve(process.cwd(), "src/scripts/medusa_import_products.csv")
    ];

    let filePath = "";
    for (const p of possiblePaths) {
        if (fs.existsSync(p)) {
            filePath = p;
            break;
        }
    }

    if (!filePath) {
        logger.error(`Could not find 'medusa_import_products.csv' in usual locations.`);
        logger.info(`Checked: ${possiblePaths.join(", ")}`);
        return;
    }

    logger.info(`Found CSV at ${filePath}`);
    const csvContent = fs.readFileSync(filePath, "utf-8");
    const parsedData = parseCSV(csvContent);
    logger.info(`Parsed ${parsedData.length} rows.`);

    if (parsedData.length === 0) {
        logger.warn("CSV is empty or could not be parsed.");
        return;
    }

    // 2. Prepare dependencies
    let salesChannels = await salesChannelModuleService.listSalesChannels({});

    if (!salesChannels.length) {
        logger.warn("Default Sales Channel not found. Fetching any sales channel...");
        salesChannels = await salesChannelModuleService.listSalesChannels({});
    }

    if (!salesChannels.length) {
        logger.error("No Sales Channel found. Cannot import products.");
        return;
    }
    const defaultSalesChannel = salesChannels[0];
    logger.info(`Using Sales Channel: ${defaultSalesChannel.name} (${defaultSalesChannel.id})`);

    const shippingProfiles = await fulfillmentModuleService.listShippingProfiles({
        type: "default",
    });
    let shippingProfile = shippingProfiles[0];

    if (!shippingProfile) {
        logger.warn("Default Shipping Profile not found. Fetching any shipping profile...");
        const allProfiles = await fulfillmentModuleService.listShippingProfiles({});
        if (allProfiles.length) shippingProfile = allProfiles[0];
    }

    if (!shippingProfile) {
        logger.error("No Shipping Profile found.");
        return;
    }
    logger.info(`Using Shipping Profile: ${shippingProfile.name} (${shippingProfile.id})`);

    // 3. Group by Product Handle (assuming multiple rows per product for variants)
    const productsMap = new Map<string, any>();

    let rowIndex = 0;
    for (const row of parsedData) {
        rowIndex++;
        // Map keys from CSV
        const handle = row['Product Handle'];
        if (!handle) continue;

        // Generate UNIQUE Handle for EVERY row using an index to prevent any merging
        const rawSku = row['Variant SKU'] || handle;
        const skuSuffix = rawSku.toLowerCase().replace(/[^a-z0-9]+/g, '-');
        const finalHandle = `${handle}-${skuSuffix}-${rowIndex}`.replace(/-+/g, '-');

        if (!productsMap.has(finalHandle)) {
            productsMap.set(finalHandle, {
                title: row['Product Title'],
                handle: finalHandle,
                description: row['Product Description'],
                status: ProductStatus.PUBLISHED,
                shipping_profile_id: shippingProfile.id,
                sales_channels: [{ id: defaultSalesChannel.id }],
                options: [],
                variants: [],
                images: [1, 2, 3, 4, 5]
                    .map(i => row[`Product Image ${i} Url`])
                    .filter(Boolean)
                    .map(url => ({ url: url.trim() }))
            });
        }

        const product = productsMap.get(finalHandle);

        let option1Name = row['Variant Option 1 Name'] || "Option";
        let option1Value = row['Variant Option 1 Value'] || "Default";

        if (option1Name && option1Value) {
            // Add option if not exists
            let option = product.options.find((o: any) => o.title === option1Name);
            if (!option) {
                option = { title: option1Name, values: [] };
                product.options.push(option);
            }
            if (!option.values.includes(option1Value)) {
                option.values.push(option1Value);
            }

            // Convert price (assuming ZAR defaults)
            const rawPrice = parseFloat(row['Variant Price ZAR']) || 0;
            // Assuming CSV is in main units (e.g. 130.0 for 130 ZAR), convert to cents
            const price = Math.round(rawPrice * 100);

            // Ensure SKU is globally unique in Medusa by using the unique handle
            // Wix often reuses SKUs across different products (e.g. "Liquor-Cider" for all ciders)
            const finalSku = finalHandle;

            product.variants.push({
                title: `${option1Value}`,
                sku: finalSku,
                options: {
                    [option1Name]: option1Value
                },
                prices: [
                    {
                        amount: price,
                        currency_code: "zar"
                    }
                ]
            });
        }
    }

    // 4. Import Products
    const allProducts = Array.from(productsMap.values());
    const validProducts = allProducts.filter((p: any) => p.variants.length > 0 && p.options.length > 0);
    const invalidProducts = allProducts.filter((p: any) => p.variants.length === 0 || p.options.length === 0);

    if (invalidProducts.length > 0) {
        logger.warn(`Skipping ${invalidProducts.length} products due to missing variants or options:`);
        logger.warn(invalidProducts.map((p: any) => p.handle).join(", "));
    }

    logger.info(`Prepared ${validProducts.length} valid products for import.`);

    if (validProducts.length > 0) {
        let successCount = 0;
        let existCount = 0;
        for (const product of validProducts) {
            try {
                await createProductsWorkflow(container).run({
                    input: {
                        products: [product]
                    }
                });
                successCount++;
            } catch (err: any) {
                if (err.message && (err.message.includes("already exists") || err.message.includes("duplicate key"))) {
                    logger.warn(`Skipping existing product: ${product.handle}. Error: ${err.message}`);
                    existCount++;
                } else {
                    logger.error(`Failed to import ${product.handle}: ${err.message}`);
                }
            }
        }
        logger.info(`Successfully imported ${successCount} new products. Skipped ${existCount} existing products.`);
    } else {
        logger.info("No valid products to import.");
    }
}
