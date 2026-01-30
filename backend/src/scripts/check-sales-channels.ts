
import { ExecArgs } from "@medusajs/framework/types";
import { ContainerRegistrationKeys, Modules } from "@medusajs/framework/utils";

export default async function checkSalesChannels({ container }: ExecArgs) {
    const logger = container.resolve(ContainerRegistrationKeys.LOGGER);
    const salesChannelModuleService = container.resolve(Modules.SALES_CHANNEL);
    const productModuleService = container.resolve(Modules.PRODUCT);
    const apiKeyModuleService = container.resolve(Modules.API_KEY);

    logger.info("--- Checking Sales Channels ---");
    const salesChannels = await salesChannelModuleService.listSalesChannels({});

    if (salesChannels.length === 0) {
        logger.error("No Sales Channels found in the system!");
    } else {
        for (const sc of salesChannels) {
            logger.info(`Channel: "${sc.name}" (ID: ${sc.id})`);

            // Count products in this channel
            // Skipping product count due to query issue in script
            logger.info(`  - Product Count: (Skipped)`);
        }
    }

    logger.info("\n--- Checking Publishable Keys ---");
    const pubKeys = await apiKeyModuleService.listApiKeys({
        type: "publishable"
    }, {
        relations: ["sales_channels"]
    });

    if (pubKeys.length === 0) {
        logger.warn("No Publishable Keys found!");
    } else {
        for (const key of pubKeys) {
            logger.info(`Key: "${key.title}" (ID: ${key.id})`);
            logger.info(`  - Token: ${key.token}`);
            logger.info(`  - Redacted: ${key.redacted}`);

            // @ts-ignore
            if (key.sales_channels && key.sales_channels.length > 0) {
                logger.info(`  - Associated Sales Channels:`);
                // @ts-ignore
                key.sales_channels.forEach(sc => {
                    logger.info(`    - [${sc.id}] ${sc.name}`);
                });
            } else {
                logger.warn(`  - [WARNING] This key is NOT associated with any Sales Channel!`);
            }
        }
    }

    // Check Configured Token from Environment (Hardcoded in script for now based on what we saw)
    const frontendToken = "pk_44dcd7afe0c33138479043ee705825c4d177125b26a55e60d525c03c6d9a226e";
    logger.info(`\n--- Verifying Frontend Token: ${frontendToken} ---`);

    const matchedKey = pubKeys.find(k => k.token === frontendToken);
    if (matchedKey) {
        logger.info(`✅ MATCH FOUND! The frontend token corresponds to Key ID: ${matchedKey.id} ("${matchedKey.title}")`);
    } else {
        logger.error(`❌ NO MATCH FOUND! The frontend token does NOT exist in the backend.`);
    }

}
