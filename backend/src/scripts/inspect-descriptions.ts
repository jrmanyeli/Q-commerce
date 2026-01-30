import { ExecArgs } from "@medusajs/framework/types";
import { ContainerRegistrationKeys, Modules } from "@medusajs/framework/utils";

export default async function inspectDescriptions({ container }: ExecArgs) {
    const logger = container.resolve(ContainerRegistrationKeys.LOGGER);
    const query = container.resolve(ContainerRegistrationKeys.QUERY);

    logger.info("Inspecting product descriptions...");

    const { data: products } = await query.graph({
        entity: "product",
        fields: ["id", "handle", "description"],
    });

    const messyProducts = products.filter((p: any) =>
        p.description && (p.description.includes("<p>") || p.description.includes("<strong>"))
    );

    logger.info(`Found ${messyProducts.length} products with HTML-like descriptions.`);

    messyProducts.slice(0, 10).forEach((p: any) => {
        logger.info(`Handle: ${p.handle}`);
        logger.info(`Description: ${p.description}`);
        logger.info("---");
    });
}
