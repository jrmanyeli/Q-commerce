import { ExecArgs } from "@medusajs/framework/types";
import { ContainerRegistrationKeys, Modules } from "@medusajs/framework/utils";

export default async function resetOrganization({ container }: ExecArgs) {
    const logger = container.resolve(ContainerRegistrationKeys.LOGGER);
    const productModuleService = container.resolve(Modules.PRODUCT);
    const query = container.resolve(ContainerRegistrationKeys.QUERY);

    logger.info("Cleaning up collections and categories...");

    // 1. Fetch and delete collections
    const { data: collections } = await query.graph({
        entity: "product_collection",
        fields: ["id"],
    });

    if (collections.length > 0) {
        logger.info(`Deleting ${collections.length} collections...`);
        await productModuleService.deleteProductCollections(collections.map(c => c.id));
    }

    // 2. Fetch and delete categories
    const { data: categories } = await query.graph({
        entity: "product_category",
        fields: ["id"],
    });

    if (categories.length > 0) {
        logger.info(`Deleting ${categories.length} categories...`);
        await productModuleService.deleteProductCategories(categories.map(c => c.id));
    }

    logger.info("Successfully cleaned up organization metadata.");
}
