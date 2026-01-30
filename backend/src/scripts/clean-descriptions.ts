import { ExecArgs } from "@medusajs/framework/types";
import { ContainerRegistrationKeys, Modules } from "@medusajs/framework/utils";

export default async function cleanDescriptions({ container }: ExecArgs) {
    const logger = container.resolve(ContainerRegistrationKeys.LOGGER);
    const query = container.resolve(ContainerRegistrationKeys.QUERY);
    const productModuleService = container.resolve(Modules.PRODUCT);

    logger.info("Starting product description cleanup...");

    // 1. Fetch all products with descriptions
    const { data: products } = await query.graph({
        entity: "product",
        fields: ["id", "handle", "description"],
    });

    logger.info(`Found ${products.length} products total.`);

    let updateCount = 0;

    for (const product of products) {
        if (!product.description) continue;

        const original = product.description;

        // Cleanup logic:
        // 1. Replace </p> with double newlines to preserve spacing before stripping
        // 2. Strip all HTML tags
        // 3. Replace &nbsp; with space
        // 4. Trim excessive newlines and whitespace

        let cleaned = original
            .replace(/<\/p>/gi, "\n\n")
            .replace(/<br\s*\/?>/gi, "\n")
            .replace(/<[^>]+>/g, "")
            .replace(/&nbsp;/g, " ")
            .replace(/[ \t]+/g, " ") // Collapse multiple spaces
            .replace(/\n\s*\n\s*\n/g, "\n\n") // Collapse triple+ newlines to double
            .trim();

        if (cleaned !== original) {
            try {
                await productModuleService.updateProducts(product.id, {
                    description: cleaned
                });
                updateCount++;
                if (updateCount <= 5) {
                    logger.info(`Cleaned ${product.handle}:`);
                    logger.info(`  Original: ${original.substring(0, 50)}...`);
                    logger.info(`  Cleaned:  ${cleaned.substring(0, 50)}...`);
                }
            } catch (error: any) {
                logger.error(`Failed to update product ${product.handle}: ${error.message}`);
            }
        }
    }

    logger.info(`Successfully cleaned descriptions for ${updateCount} products.`);
    logger.info("Product description cleanup completed.");
}
