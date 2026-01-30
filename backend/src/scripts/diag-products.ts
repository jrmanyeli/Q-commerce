import { ExecArgs } from "@medusajs/framework/types";
import { ContainerRegistrationKeys, Modules } from "@medusajs/framework/utils";

export default async function diagProducts({ container }: ExecArgs) {
    const logger = container.resolve(ContainerRegistrationKeys.LOGGER);
    const query = container.resolve(ContainerRegistrationKeys.QUERY);

    logger.info("Starting product diagnostics...");

    // 1. Fetch all products and their variants
    const { data: products } = await query.graph({
        entity: "product",
        fields: ["id", "handle", "variants.id", "variants.manage_inventory"],
    });

    logger.info(`Total Products: ${products.length}`);

    const productsNoVariants = products.filter((p: any) => !p.variants || p.variants.length === 0);
    logger.info(`Products with NO variants: ${productsNoVariants.length}`);
    productsNoVariants.forEach((p: any) => logger.info(`- ${p.handle}`));

    const variantsManageInventory = products.flatMap((p: any) => p.variants || [])
        .filter((v: any) => v.manage_inventory === true);

    logger.info(`Variants with manage_inventory: true: ${variantsManageInventory.length}`);
    if (variantsManageInventory.length > 0) {
        variantsManageInventory.slice(0, 10).forEach((v: any) => logger.info(`- Variant ${v.id}`));
    }
}
