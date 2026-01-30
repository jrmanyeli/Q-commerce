import { ExecArgs } from "@medusajs/framework/types";
import { ContainerRegistrationKeys, Modules } from "@medusajs/framework/utils";

export default async function deleteAllInventory({ container }: ExecArgs) {
    const logger = container.resolve(ContainerRegistrationKeys.LOGGER);
    const inventoryModuleService = container.resolve(Modules.INVENTORY);

    logger.info("Cleaning up inventory items...");

    // 1. Fetch all inventory items
    const [items, count] = await inventoryModuleService.listAndCountInventoryItems({}, {
        take: 5000,
    });

    if (count === 0) {
        logger.info("No inventory items found to delete.");
        return;
    }

    logger.info(`Found ${count} inventory items. Deleting...`);

    // 2. Delete inventory items
    const itemIds = items.map(i => i.id);

    // Split into chunks if necessary
    const chunkSize = 100;
    for (let i = 0; i < itemIds.length; i += chunkSize) {
        const chunk = itemIds.slice(i, i + chunkSize);
        await inventoryModuleService.deleteInventoryItems(chunk);
        logger.info(`Deleted chunk ${i / chunkSize + 1} (${chunk.length} items).`);
    }

    logger.info("Successfully deleted all inventory items.");
}
