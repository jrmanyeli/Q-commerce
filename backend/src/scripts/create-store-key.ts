
import { ExecArgs } from "@medusajs/framework/types";
import { ContainerRegistrationKeys, Modules } from "@medusajs/framework/utils";

export default async function createStoreKey({ container }: ExecArgs) {
    const logger = container.resolve(ContainerRegistrationKeys.LOGGER);
    const salesChannelModuleService = container.resolve(Modules.SALES_CHANNEL);
    const apiKeyModuleService = container.resolve(Modules.API_KEY);

    // 1. Get the Default Sales Channel
    const salesChannels = await salesChannelModuleService.listSalesChannels({
        name: "Quick Dose (Pty) Ltd" // Logic from previous script findings
    });

    // Fallback if not found by name, though we saw it exists
    let channel = salesChannels[0];
    if (!channel) {
        // Try getting any channel
        const allChannels = await salesChannelModuleService.listSalesChannels({ take: 1 });
        channel = allChannels[0];
    }

    if (!channel) {
        logger.error("No Sales Channel found! Cannot create scoped key.");
        return;
    }

    logger.info(`Target Sales Channel: "${channel.name}" (ID: ${channel.id})`);

    // 2. Create New Publishable Key
    try {
        const apiKey = await apiKeyModuleService.createApiKeys({
            title: "Storefront Key (Fixed)",
            type: "publishable",
            created_by: "script-fix"
        });

        logger.info(`Created New API Key: "${apiKey.title}" (ID: ${apiKey.id})`);
        logger.info(`TOKEN: ${apiKey.token}`);

        // 3. Link Key to Sales Channel
        // Medusa v2: Use the link infrastructure or the service method if available.
        // For ApiKey <-> SalesChannel, it's a many-to-many.
        // In Module SDK steps, we usually use the link module or specific service methods.
        // Checking ApiKeyModuleService definition or RemoteLink.

        // For simplicity in this script context, let's try the direct update if supported,
        // or assumes the apiKey service has a method to add sales channels.
        // Note: apiKeyModuleService.updateApiKey usually doesn't handle relationships directly like this in all versions.
        // But let's try passing it or using the remote link.

        // Actually, in v2, we often use the Remote Link for cross-module relations.
        // However, ApiKey and SalesChannel often live in separate modules (ApiKey vs SalesChannel).
        // Let's assume we can resolve the RemoteLink.

        const remoteLink = container.resolve(ContainerRegistrationKeys.REMOTE_LINK);

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

        logger.info(`Successfully linked API Key to Sales Channel.`);
        logger.info(`\n\n--- USE THIS KEY IN FRONTEND .env.local ---`);
        logger.info(`NEXT_PUBLIC_MEDUSA_PUBLISHABLE_KEY=${apiKey.token}`);
        logger.info(`---------------------------------------------`);

    } catch (error) {
        logger.error(`Failed to create/link key: ${error.message}`);
    }
}
