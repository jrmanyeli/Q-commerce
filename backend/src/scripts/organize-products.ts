import { ExecArgs } from "@medusajs/framework/types";
import { ContainerRegistrationKeys, Modules } from "@medusajs/framework/utils";

export default async function organizeProducts({ container }: ExecArgs) {
    const productModuleService = container.resolve(Modules.PRODUCT);
    const logger = container.resolve(ContainerRegistrationKeys.LOGGER);

    const keyGroups = [
        { keywords: ["Nasty"], name: "Nasty" },
        { keywords: ["Moti"], name: "Moti" },
        { keywords: ["ELFBAR"], name: "ELFBAR" },
        { keywords: ["Bugatti"], name: "Bugatti" },
        { keywords: ["Savanna", "Castle", "Windhoek", "Amstel", "Corona", "Heineken", "Brutal Fruit", "KIX", "Bernini", "Flying Fish", "Red Square", "Belgravia", "Hunters", "Hunter's", "Smirnoff", "Cruz", "Jameson", "Hennessy", "Ciroc", "Tanqueray", "Bombay", "Jagermeister", "Klipdrift", "Richelieu", "Russian Bear", "Strettons", "Gordons", "Captain Morgan", "Spiced Gold", "Black Label", "Red Label", "Blue Label", "Green Label", "Gold Label", "Platinum Label", "White Horse", "Bells", "J&B", "Vat 69", "Scottish Leader", "Three Ships", "Bain's", "Amarula", "Wild Africa", "Strawberry Lips", "Poliakov", "Skyy", "Absolut", "Grey Goose", "Belvedere", "Don Julio", "Patron", "Jose Cuervo", "El Jimador", "Ponchos", "Olmeca", "Avion", "1800", "Espolon", "Herradura", "Corralejo", "Cazadores", "Sauza", "Sierra", "Tequila", "Gin", "Vodka", "Rum", "Brandy", "Whiskey", "Whisky", "Bourbon", "Cognac", "Liqueur", "Beer", "Cider", "Wine", "Champagne", "Prosecco", "Sparkling", "Chateau", "Del Rei", "Drostdy Hof", "4th Street", "Graca", "Two Oceans", "Nederburg", "Robertson"], name: "Liquor", excludeKeywords: ["Vape", "Nasty", "Moti", "ELFBAR", "Bugatti", "Cannabis", "Bar", "Pod", "Disposable"] },
        { keywords: ["Cannabis"], name: "Cannabis" },
    ];

    // Fetch ALL products first (since we have < 1000, single pages is fine, but let's be safe)
    // Need to include variants to check SKUs
    const [allProducts, totalCount] = await productModuleService.listAndCountProducts({}, {
        take: 10000,
        relations: ["variants"]
    });
    logger.info(`Fetched ${allProducts.length} products to categorize.`);

    for (const group of keyGroups) {
        logger.info(`Processing group: ${group.name}`);

        // 1. Ensure Collection Exists
        let [collections] = await productModuleService.listAndCountProductCollections({
            title: group.name,
        });

        let collectionId = "";
        if (collections.length === 0) {
            logger.info(`Creating collection: ${group.name}`);
            const newCollection = await productModuleService.createProductCollections([
                { title: group.name, handle: group.name.toLowerCase() }
            ]);
            collectionId = newCollection[0].id;
        } else {
            collectionId = collections[0].id;
            logger.info(`Found collection: ${group.name} (${collectionId})`);
        }

        // 2. Ensure Category Exists
        let [categories] = await productModuleService.listAndCountProductCategories({
            name: group.name,
        });

        let categoryId = "";
        if (categories.length === 0) {
            logger.info(`Creating category: ${group.name}`);
            const newCategory = await productModuleService.createProductCategories([
                { name: group.name, handle: group.name.toLowerCase() }
            ]);
            categoryId = newCategory[0].id;
        } else {
            categoryId = categories[0].id;
            logger.info(`Found category: ${group.name} (${categoryId})`);
        }

        // 2.5 RESET Collection for Liquor (To ensure clean state)
        if (group.name === "Liquor") {
            // No need to reset via API calls if we are iterating all anyway.
            // Actually, we should just ensure we re-evaluate everything.
            // But to be safe, let's skip the expensive reset call and just do rigorous checking below.
        }

        // 3. Match Products In-Memory
        const updates: any[] = [];
        const excludeKeywords = (group as any).excludeKeywords || [];

        for (const product of allProducts) {
            const title = (product.title || "").toLowerCase();
            const handle = (product.handle || "").toLowerCase();
            const description = (product.description || "").toLowerCase();

            let skuString = "";
            if (product.variants) {
                skuString = product.variants.map((v: any) => v.sku || "").join(" ").toLowerCase();
            }

            // Check exclusions first
            if (excludeKeywords.length > 0) {
                const hasExcluded = excludeKeywords.some((k: string) =>
                    title.includes(k.toLowerCase()) ||
                    handle.includes(k.toLowerCase()) ||
                    description.includes(k.toLowerCase()) ||
                    skuString.includes(k.toLowerCase())
                );
                if (hasExcluded) continue;
            }

            // Check Inclusions
            let match = false;
            for (const keyword of group.keywords) {
                const k = keyword.toLowerCase();
                if (title.includes(k) || handle.includes(k) || description.includes(k) || skuString.includes(k)) {
                    match = true;
                    break;
                }
            }

            if (match) {
                // Check if update needed (optimization: only if not already in collection)
                // But we might want to move it if it's in WRONG collection.
                // For now, if it matches validly, put it in.
                if (product.collection_id !== collectionId) {
                    updates.push({
                        id: product.id,
                        collection_id: collectionId,
                    });
                }
            }
        }

        if (updates.length > 0) {
            logger.info(`Updating ${updates.length} products for ${group.name}...`);
            for (const update of updates) {
                await productModuleService.updateProducts(update.id, {
                    collection_id: update.collection_id,
                    category_ids: [categoryId]
                });
            }
            logger.info(`Updated matching products.`);
        } else {
            logger.info(`No new updates for ${group.name}.`);
        }
    }
}
