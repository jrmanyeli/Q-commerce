import { ExecArgs } from "@medusajs/framework/types";
import { ContainerRegistrationKeys, Modules } from "@medusajs/framework/utils";

export default async function deleteLeftovers({ container }: ExecArgs) {
    const productModuleService = container.resolve(Modules.PRODUCT);
    const logger = container.resolve(ContainerRegistrationKeys.LOGGER);

    // Explicit list of seeded products to remove
    const handles = ["t-shirt", "shorts", "sweatshirt", "sweatpants", "berry-grade"];

    logger.info("Cleaning up leftover seeded products...");
    const [products] = await productModuleService.listAndCountProducts({ handle: handles });

    if (products.length > 0) {
        await productModuleService.deleteProducts(products.map(p => p.id));
        logger.info(`Deleted ${products.length} leftovers: ` + products.map(p => p.handle).join(", "));
    } else {
        logger.info("No leftover seeded products found.");
    }
}
