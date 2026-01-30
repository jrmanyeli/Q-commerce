import { ExecArgs } from "@medusajs/framework/types";
import { ContainerRegistrationKeys, Modules } from "@medusajs/framework/utils";

export default async function deleteAllProducts({ container }: ExecArgs) {
    const logger = container.resolve(ContainerRegistrationKeys.LOGGER);
    const productModuleService = container.resolve(Modules.PRODUCT);

    logger.info("Cleaning up products...");

    // 1. Fetch all products
    const [products, count] = await productModuleService.listAndCountProducts({}, {
        take: 5000,
    });

    if (count === 0) {
        logger.info("No products found to delete.");
        return;
    }

    logger.info(`Found ${count} products. Deleting...`);

    // 2. Delete products
    const productIds = products.map(p => p.id);

    // Split into chunks of 100 to avoid large payload issues
    const chunkSize = 100;
    for (let i = 0; i < productIds.length; i += chunkSize) {
        const chunk = productIds.slice(i, i + chunkSize);
        await productModuleService.deleteProducts(chunk);
        logger.info(`Deleted chunk ${i / chunkSize + 1} (${chunk.length} products).`);
    }

    logger.info("Successfully deleted all products.");
}
