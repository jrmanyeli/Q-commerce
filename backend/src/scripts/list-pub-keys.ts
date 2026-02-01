
import { ExecArgs } from "@medusajs/framework/types";
import { ContainerRegistrationKeys, Modules } from "@medusajs/framework/utils";

export default async function listApiKeys({ container }: ExecArgs) {
    const logger = container.resolve(ContainerRegistrationKeys.LOGGER);
    const apiKeyModuleService = container.resolve(Modules.API_KEY);

    logger.info("--- Listing Publishable API Keys ---");
    const pubKeys = await apiKeyModuleService.listApiKeys({
        type: "publishable"
    });

    if (pubKeys.length === 0) {
        logger.warn("No Publishable Keys found!");
    } else {
        pubKeys.forEach(key => {
            logger.info(`Title: "${key.title}" | Token: ${key.token} | ID: ${key.id}`);
        });
    }
}
