
import { ExecArgs } from "@medusajs/framework/types";
import { ContainerRegistrationKeys, Modules } from "@medusajs/framework/utils";

export default async function findIds({ container }: ExecArgs) {
    const logger = container.resolve(ContainerRegistrationKeys.LOGGER);
    const salesChannelModuleService = container.resolve(Modules.SALES_CHANNEL);
    const stockLocationModuleService = container.resolve(Modules.STOCK_LOCATION);
    const productModuleService = container.resolve(Modules.PRODUCT);

    logger.info("--- Searching for IDs ---");

    const salesChannels = await salesChannelModuleService.listSalesChannels({
        name: "Quick Dose (Pty) Ltd"
    });

    if (salesChannels.length > 0) {
        logger.info(`Found Sales Channel: "${salesChannels[0].name}" (ID: ${salesChannels[0].id})`);
    } else {
        const allSc = await salesChannelModuleService.listSalesChannels({});
        logger.warn("Sales Channel 'Quick Dose (Pty) Ltd' not found. Available ones:");
        allSc.forEach(sc => logger.info(`- ${sc.name} (ID: ${sc.id})`));
    }

    const locations = await stockLocationModuleService.listStockLocations({
        name: "Rustenburg Warehouse"
    });

    if (locations.length > 0) {
        logger.info(`Found Location: "${locations[0].name}" (ID: ${locations[0].id})`);
    } else {
        const allLoc = await stockLocationModuleService.listStockLocations({});
        logger.warn("Location 'Rustenburg Warehouse' not found. Available ones:");
        allLoc.forEach(loc => logger.info(`- ${loc.name} (ID: ${loc.id})`));
    }
}
