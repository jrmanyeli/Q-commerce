import { ExecArgs } from "@medusajs/framework/types";
import { ContainerRegistrationKeys, Modules } from "@medusajs/framework/utils";

export default async function checkStock({ container }: ExecArgs) {
    const logger = container.resolve(ContainerRegistrationKeys.LOGGER);
    const query = container.resolve(ContainerRegistrationKeys.QUERY);
    const stockLocationModuleService = container.resolve(Modules.STOCK_LOCATION);

    logger.info("Checking product stock levels...");

    // Get stock locations
    const stockLocations = await stockLocationModuleService.listStockLocations({});
    logger.info(`Found ${stockLocations.length} stock locations.`);
    stockLocations.forEach(sl => logger.info(`- Location: ${sl.name} (${sl.id})`));

    // Get inventory items and their levels
    const { data: inventoryItems } = await query.graph({
        entity: "inventory_item",
        fields: ["id", "sku", "location_levels.stocked_quantity", "location_levels.location_id"],
    });

    logger.info(`Found ${inventoryItems.length} inventory items.`);

    inventoryItems.slice(0, 10).forEach((item: any) => {
        const levels = item.location_levels?.map((l: any) => `${l.stocked_quantity} at ${l.location_id}`).join(", ") || "No levels";
        logger.info(`- Item SKU: ${item.sku} | Levels: ${levels}`);
    });

    // Get variants and check manage_inventory
    const { data: variants } = await query.graph({
        entity: "product_variant",
        fields: ["id", "title", "sku", "manage_inventory"],
    });

    const manageFalse = variants.filter((v: any) => !v.manage_inventory).length;
    logger.info(`Found ${variants.length} variants. ${manageFalse} have manage_inventory: false`);
}
