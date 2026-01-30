
import { ExecArgs } from "@medusajs/framework/types";
import { ContainerRegistrationKeys, Modules } from "@medusajs/framework/utils";

export default async function linkKey({ container }: ExecArgs) {
    const logger = container.resolve(ContainerRegistrationKeys.LOGGER);
    const salesChannelModuleService = container.resolve(Modules.SALES_CHANNEL);
    const apiKeyModuleService = container.resolve(Modules.API_KEY);
    const remoteLink = container.resolve(ContainerRegistrationKeys.REMOTE_LINK);

    // 1. Get the Sales Channel
    const salesChannels = await salesChannelModuleService.listSalesChannels({
        name: "Quick Dose (Pty) Ltd"
    });
    const channel = salesChannels[0];
    if (!channel) {
        logger.error("Channel not found");
        return;
    }

    // 2. Get the specific Key we created
    const keys = await apiKeyModuleService.listApiKeys({
        title: "Storefront Key (Fixed)"
    });
    const apiKey = keys[0];

    if (!apiKey) {
        logger.error("API Key 'Storefront Key (Fixed)' not found. Run create script first?");
        return;
    }

    logger.info(`Linking Key: ${apiKey.id} to Channel: ${channel.id}`);

    try {
        // Attempt linking using 'id' as the key
        await remoteLink.create([
            {
                [Modules.API_KEY]: {
                    publishable_key_id: apiKey.id,
                },
                [Modules.SALES_CHANNEL]: {
                    sales_channel_id: channel.id,
                },
            },
        ]);
        logger.info("Success! Linked using 'publishable_key_id' and 'sales_channel_id'.");
    } catch (err: any) {
        logger.info(`Attempt 1 failed: ${err.message}`);

        try {
            await remoteLink.create([
                {
                    [Modules.API_KEY]: {
                        api_key_id: apiKey.id,
                    },
                    [Modules.SALES_CHANNEL]: {
                        sales_channel_id: channel.id,
                    },
                },
            ]);
            logger.info("Success! Linked using 'api_key_id' and 'sales_channel_id'.");
        } catch (err2: any) {
            logger.info(`Attempt 2 failed: ${err2.message}`);

            try {
                // Try just 'id' which map to PKs usually
                await remoteLink.create([
                    {
                        [Modules.API_KEY]: {
                            id: apiKey.id,
                        },
                        [Modules.SALES_CHANNEL]: {
                            id: channel.id,
                        },
                    },
                ]);
                logger.info("Success! Linked using 'id' and 'id'.");
            } catch (err3: any) {
                logger.error(`Attempt 3 failed: ${err3.message}`);
                logger.error("Could not link.");
            }
        }
    }
}
