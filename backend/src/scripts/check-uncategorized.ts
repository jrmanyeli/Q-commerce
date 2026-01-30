import { ExecArgs } from "@medusajs/framework/types";
import { ContainerRegistrationKeys, Modules } from "@medusajs/framework/utils";

export default async function checkUncategorized({ container }: ExecArgs) {
    const productModuleService = container.resolve(Modules.PRODUCT);
    const logger = container.resolve(ContainerRegistrationKeys.LOGGER);

    // List all products and check their collection
    const [products, count] = await productModuleService.listAndCountProducts({}, { take: 10000 });

    const uncategorized = products.filter(p => !p.collection_id);

    logger.info(`Total Products: ${count}`);
    logger.info(`Uncategorized Products: ${uncategorized.length}`);

    if (uncategorized.length > 0) {
        logger.info("Sample Uncategorized Products (First 50):");
        uncategorized.slice(0, 50).forEach(p => {
            logger.info(`- ${p.title} (Handle: ${p.handle})`);
        });
    }
}
