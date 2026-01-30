import { Suspense } from "react"

import SkeletonProductGrid from "@modules/skeletons/templates/skeleton-product-grid"
import RefinementList from "@modules/store/components/refinement-list"
import { SortOptions } from "@modules/store/components/refinement-list/sort-products/index"
import PaginatedProducts from "@modules/store/templates/paginated-products"
import { HttpTypes } from "@medusajs/types"

export default function CollectionTemplate({
  sortBy,
  collection,
  categories,
  collections,
  page,
  countryCode,
}: {
  sortBy?: SortOptions
  collection: HttpTypes.StoreCollection
  categories?: HttpTypes.StoreProductCategory[]
  collections?: HttpTypes.StoreCollection[]
  page?: string
  countryCode: string
}) {
  const pageNumber = page ? parseInt(page) : 1
  const sort = sortBy || "created_at"

  return (
    <div className="flex flex-col py-6 content-container gap-y-8">
      <div className="flex flex-col small:grid small:grid-cols-[250px_1fr] gap-x-10">
        <aside className="hidden small:block sticky top-28 self-start">
          <RefinementList
            sortBy={sort}
            categories={categories}
            collections={collections}
            isSidebar={true}
          />
        </aside>

        <div className="flex flex-col w-full">
          <RefinementList
            sortBy={sort}
            categories={categories}
            collections={collections}
          />

          <div className="flex flex-col mb-8 mt-4 small:mt-0">

          </div>

          <Suspense
            fallback={
              <SkeletonProductGrid
                numberOfProducts={collection.products?.length}
              />
            }
          >
            <PaginatedProducts
              sortBy={sort}
              page={pageNumber}
              collectionId={collection.id}
              countryCode={countryCode}
            />
          </Suspense>
        </div>
      </div>
    </div>
  )
}
