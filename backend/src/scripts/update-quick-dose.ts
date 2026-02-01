
import { ExecArgs } from "@medusajs/framework/types";
import { ContainerRegistrationKeys, Modules } from "@medusajs/framework/utils";

export default async function updateQuickDose({ container }: ExecArgs) {
    const logger = container.resolve(ContainerRegistrationKeys.LOGGER);
    const query = container.resolve(ContainerRegistrationKeys.QUERY);
    const productModuleService = container.resolve(Modules.PRODUCT);
    const inventoryModuleService = container.resolve(Modules.INVENTORY);
    const stockLocationModuleService = container.resolve(Modules.STOCK_LOCATION);
    const salesChannelModuleService = container.resolve(Modules.SALES_CHANNEL);
    const link = container.resolve(ContainerRegistrationKeys.LINK);

    const SALES_CHANNEL_ID = "sc_01KG76BYGBZ4A0MF6506V3ND8Q";
    const LOCATION_ID = "sloc_01KG71R97WVCQJKSBY6G7Y1M4X";

    logger.info(`--- Updating Products for Quick Dose (Pty) Ltd ---`);
    logger.info(`Sales Channel: ${SALES_CHANNEL_ID}`);
    logger.info(`Target Location: ${LOCATION_ID}`);

    // 1. Fetch all products and filter for the sales channel
    // Using query.graph to get products and their sales channels
    const { data: allProducts } = await query.graph({
        entity: "product",
        fields: ["*", "variants.*", "sales_channels.*"],
    });

    const products = allProducts.filter((p: any) =>
        p.sales_channels && p.sales_channels.some((sc: any) => sc.id === SALES_CHANNEL_ID)
    );

    if (products.length === 0) {
        logger.error("No products found for the specified sales channel.");
        return;
    }

    logger.info(`Found ${products.length} products to update.`);

    // 2. Define categorization logic (from organize-products.ts)
    const keyGroups = [
        { keywords: ["Nasty"], name: "Nasty" },
        { keywords: ["Moti"], name: "Moti" },
        { keywords: ["ELFBAR"], name: "ELFBAR" },
        { keywords: ["Bugatti"], name: "Bugatti" },
        { keywords: ["Savanna", "Castle", "Windhoek", "Amstel", "Corona", "Heineken", "Brutal Fruit", "KIX", "Bernini", "Flying Fish", "Red Square", "Belgravia", "Hunters", "Hunter's", "Smirnoff", "Cruz", "Jameson", "Hennessy", "Ciroc", "Tanqueray", "Bombay", "Jagermeister", "Klipdrift", "Richelieu", "Russian Bear", "Strettons", "Gordons", "Captain Morgan", "Spiced Gold", "Black Label", "Red Label", "Blue Label", "Green Label", "Gold Label", "Platinum Label", "White Horse", "Bells", "J&B", "Vat 69", "Scottish Leader", "Three Ships", "Bain's", "Amarula", "Wild Africa", "Strawberry Lips", "Poliakov", "Skyy", "Absolut", "Grey Goose", "Belvedere", "Don Julio", "Patron", "Jose Cuervo", "El Jimador", "Ponchos", "Olmeca", "Avion", "1800", "Espolon", "Herradura", "Corralejo", "Cazadores", "Sauza", "Sierra", "Tequila", "Gin", "Vodka", "Rum", "Brandy", "Whiskey", "Whisky", "Bourbon", "Cognac", "Liqueur", "Beer", "Cider", "Wine", "Champagne", "Prosecco", "Sparkling", "Chateau", "Del Rei", "Drostdy Hof", "4th Street", "Graca", "Two Oceans", "Nederburg", "Robertson"], name: "Liquor", excludeKeywords: ["Vape", "Nasty", "Moti", "ELFBAR", "Bugatti", "Cannabis", "Bar", "Pod", "Disposable"] },
        { keywords: ["Cannabis"], name: "Cannabis" },
    ];

    // Cache categories and collections
    const categoryMap = new Map();
    const collectionMap = new Map();

    for (const group of keyGroups) {
        // Find or create Collection
        let [collections] = await productModuleService.listAndCountProductCollections({
            title: group.name
        });

        if (collections.length === 0) {
            // Double check by handle to avoid "already exists" error
            const handle = group.name.toLowerCase();
            let [collectionsByHandle] = await productModuleService.listAndCountProductCollections({
                handle: handle
            });

            if (collectionsByHandle.length === 0) {
                logger.info(`Creating collection: ${group.name}`);
                const newCol = await productModuleService.createProductCollections([{ title: group.name, handle: handle }]);
                collectionMap.set(group.name, newCol[0].id);
            } else {
                collectionMap.set(group.name, collectionsByHandle[0].id);
            }
        } else {
            collectionMap.set(group.name, collections[0].id);
        }

        // Find or create Category
        let [categories] = await productModuleService.listAndCountProductCategories({
            name: group.name
        });

        if (categories.length === 0) {
            const handle = group.name.toLowerCase();
            let [categoriesByHandle] = await productModuleService.listAndCountProductCategories({
                handle: handle
            });

            if (categoriesByHandle.length === 0) {
                logger.info(`Creating category: ${group.name}`);
                const newCat = await productModuleService.createProductCategories([{ name: group.name, handle: handle }]);
                categoryMap.set(group.name, newCat[0].id);
            } else {
                categoryMap.set(group.name, categoriesByHandle[0].id);
            }
        } else {
            categoryMap.set(group.name, categories[0].id);
        }
    }

    // 3. Process products
    for (const product of products) {
        logger.info(`Processing product: ${product.title} (${product.id})`);

        // A. Update Categorization
        const title = (product.title || "").toLowerCase();
        const handle = (product.handle || "").toLowerCase();
        const description = (product.description || "").toLowerCase();
        const skuString = (product.variants || []).map((v: any) => (v.sku || "").toLowerCase()).join(" ");

        let matchedGroup = null;
        for (const group of keyGroups) {
            const excludeKeywords = (group as any).excludeKeywords || [];
            const hasExcluded = excludeKeywords.some((k: string) =>
                title.includes(k.toLowerCase()) ||
                handle.includes(k.toLowerCase()) ||
                description.includes(k.toLowerCase()) ||
                skuString.includes(k.toLowerCase())
            );
            if (hasExcluded) continue;

            const hasMatch = group.keywords.some((k: string) =>
                title.includes(k.toLowerCase()) ||
                handle.includes(k.toLowerCase()) ||
                description.includes(k.toLowerCase()) ||
                skuString.includes(k.toLowerCase())
            );

            if (hasMatch) {
                matchedGroup = group;
                break;
            }
        }

        if (matchedGroup) {
            logger.info(`  - Categorizing as: ${matchedGroup.name}`);
            await productModuleService.updateProducts(product.id, {
                collection_id: collectionMap.get(matchedGroup.name),
                category_ids: [categoryMap.get(matchedGroup.name)]
            });
        }

        // B. Update Location and Stock for variants
        if (product.variants && product.variants.length > 0) {
            for (const variant of product.variants) {
                logger.info(`  - Processing variant: ${variant.title || variant.sku} (${variant.id})`);

                // 1. Link Inventory Item to Location (In Medusa v2, variants have inventory items)
                // We need to find the inventory item for this variant
                const { data: variantInventory } = await query.graph({
                    entity: "product_variant",
                    fields: ["inventory_items.*"],
                    filters: { id: variant.id }
                });

                if (variantInventory && variantInventory[0].inventory_items) {
                    for (const linkItem of variantInventory[0].inventory_items) {
                        const inventoryItemId = linkItem.inventory_item_id;

                        // Check if already linked to the location
                        const levels = await inventoryModuleService.listInventoryLevels({
                            inventory_item_id: inventoryItemId,
                            location_id: LOCATION_ID
                        });

                        if (levels.length === 0) {
                            logger.info(`    - Creating inventory level at Rustenburg Warehouse...`);
                            await inventoryModuleService.createInventoryLevels([
                                {
                                    inventory_item_id: inventoryItemId,
                                    location_id: LOCATION_ID,
                                    stocked_quantity: 100 // Set to 100 as placeholder "In stock"
                                }
                            ]);
                        } else {
                            if (levels[0].stocked_quantity === 0) {
                                logger.info(`    - Updating quantity to 100 at Rustenburg Warehouse...`);
                                await inventoryModuleService.updateInventoryLevels([
                                    {
                                        inventory_item_id: inventoryItemId,
                                        location_id: LOCATION_ID,
                                        stocked_quantity: 100
                                    }
                                ]);
                            } else {
                                logger.info(`    - Variant already in stock (${levels[0].stocked_quantity}) at Rustenburg Warehouse.`);
                            }
                        }
                    }
                }
            }
        }
    }

    logger.info(`--- Update Complete ---`);
}
