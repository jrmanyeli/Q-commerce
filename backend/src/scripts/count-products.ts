import { ExecArgs } from "@medusajs/framework/types";
import { ContainerRegistrationKeys, Modules } from "@medusajs/framework/utils";

export default async function countProducts({ container }: ExecArgs) {
    const productModuleService = container.resolve(Modules.PRODUCT);
    const logger = container.resolve(ContainerRegistrationKeys.LOGGER);

    const [allProducts, allCount] = await productModuleService.listAndCountProducts({}, { take: 1000, withDeleted: true });
    const [activeProducts, activeCount] = await productModuleService.listAndCountProducts({}, { take: 1000, withDeleted: false });

    logger.info(`Total Products (Active + Deleted): ${allCount}`);
    logger.info(`Active Products: ${activeCount}`);

    if (activeCount === 425) {
        logger.info("SUCCESS: Database contains exactly 425 active products.");
    } else {
        logger.warn(`WARNING: Active product count is ${activeCount}, expected 425.`);
        logger.info("Active handles:");
        activeProducts.forEach(p => logger.info(`- ${p.handle}`));
    }
}
