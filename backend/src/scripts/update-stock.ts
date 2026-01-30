import { ExecArgs } from "@medusajs/framework/types";
import { ContainerRegistrationKeys, Modules } from "@medusajs/framework/utils";
import { createInventoryLevelsWorkflow } from "@medusajs/medusa/core-flows";

export default async function updateStock({ container }: ExecArgs) {
    const logger = container.resolve(ContainerRegistrationKeys.LOGGER);
    const query = container.resolve(ContainerRegistrationKeys.QUERY);
    const stockLocationModuleService = container.resolve(Modules.STOCK_LOCATION);
    const productModuleService = container.resolve(Modules.PRODUCT);

    logger.info("Starting stock update process...");

    // 1. Get the stock location
    const stockLocations = await stockLocationModuleService.listStockLocations({});
    if (stockLocations.length === 0) {
        logger.error("No stock locations found. Cannot update stock.");
        return;
    }

    const locationId = stockLocations[0].id;
    logger.info(`Using stock location: ${stockLocations[0].name} (${locationId})`);

    // 2. Get all inventory items
    const { data: inventoryItems } = await query.graph({
        entity: "inventory_item",
        fields: ["id", "sku", "location_levels.location_id"],
    });

    logger.info(`Found ${inventoryItems.length} inventory items.`);

    // 3. Filter items that don't have a level at this location
    const itemsToUpdate = inventoryItems.filter((item: any) => {
        return !item.location_levels?.some((l: any) => l.location_id === locationId);
    });

    logger.info(`${itemsToUpdate.length} items need new inventory levels.`);

    if (itemsToUpdate.length > 0) {
        const inventoryLevels = itemsToUpdate.map((item: any) => ({
            location_id: locationId,
            stocked_quantity: 10000,
            inventory_item_id: item.id,
        }));

        try {
            await createInventoryLevelsWorkflow(container).run({
                input: {
                    inventory_levels: inventoryLevels,
                },
            });
            logger.info(`Successfully created ${inventoryLevels.length} inventory levels.`);
        } catch (error: any) {
            logger.error(`Failed to create inventory levels: ${error.message}`);
        }
    } else {
        logger.info("All items already have inventory levels assigned.");
    }

    // 4. Update the variants to reflect the new inventory quantity and status
    // Setting manage_inventory to false is the most reliable way to ensure products are "In Stock".
    // We update through the product service to ensure all internal hooks are triggered correctly.

    // Fetch ALL products with their variants
    const [allProducts, count] = await productModuleService.listAndCountProducts({}, {
        take: 1000,
        relations: ["variants"]
    });

    logger.info(`Found ${allProducts.length} products in total (count: ${count}).`);
    logger.info(`Updating all product variants to be "In Stock"...`);

    for (const product of allProducts) {
        if (!product.variants || product.variants.length === 0) {
            logger.warn(`Product ${product.handle} (${product.id}) has no variants.`);
            continue;
        }

        try {
            const variantUpdates = product.variants.map((v: any) => ({
                id: v.id,
                manage_inventory: false,
                inventory_quantity: 10000,
                allow_backorder: true
            }));

            await productModuleService.updateProducts(product.id, {
                variants: variantUpdates
            });
        } catch (error: any) {
            logger.error(`Failed to update variants for product ${product.handle}: ${error.message}`);
        }
    }

    logger.info(`Successfully updated variants for ${allProducts.length} products.`);
    logger.info("Stock update process completed.");
}
