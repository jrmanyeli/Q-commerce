import { ExecArgs } from "@medusajs/framework/types";
import { ContainerRegistrationKeys, Modules } from "@medusajs/framework/utils";

export default async function verifyOrganization({ container }: ExecArgs) {
    const productModuleService = container.resolve(Modules.PRODUCT);
    const logger = container.resolve(ContainerRegistrationKeys.LOGGER);

    const [collections] = await productModuleService.listAndCountProductCollections({
        title: "Liquor"
    });

    if (collections.length === 0) {
        logger.info("Liquor collection not found.");
        return;
    }

    const liquorCollectionId = collections[0].id;

    const [products] = await productModuleService.listAndCountProducts({
        collection_id: liquorCollectionId
    }, { take: 1000 });

    logger.info(`Products in Liquor Collection: ${products.length}`);
    logger.info("Sample products:");
    products.slice(0, 20).forEach(p => logger.info(`- ${p.title} (${p.handle})`));

    // Check for Nasty/Vape in Liquor
    const suspicious = products.filter(p => p.title.toLowerCase().includes("vape") || p.title.toLowerCase().includes("nasty"));
    if (suspicious.length > 0) {
        logger.warn(`Found ${suspicious.length} suspicious items in Liquor collection:`);
        suspicious.forEach(p => logger.warn(`- ${p.title}`));
    }
}
