import { ExecArgs } from "@medusajs/framework/types";
import { ContainerRegistrationKeys, Modules } from "@medusajs/framework/utils";

export default async function countProducts({ container }: ExecArgs) {
    const productModuleService = container.resolve(Modules.PRODUCT);
    const logger = container.resolve(ContainerRegistrationKeys.LOGGER);

    const [products, count] = await productModuleService.listAndCountProducts({}, { take: 1000, withDeleted: true });

    logger.info(`Total Products in DB (Active + Deleted): ${count}`);
    logger.info("Product Handles (First 20):");
    products.slice(0, 20).forEach(p => logger.info(`- ${p.handle}`));

    // Optional: check for specific handles
    // const specific = await productModuleService.listProducts({ handle: "blackberry-ice-vape-nasty-dx1-2" });
    // logger.info(`Found specific product: ${specific.length}`);
}
