import { HttpTypes } from "@medusajs/types"
import { Suspense } from "react"
import SkeletonProductGrid from "@modules/skeletons/templates/skeleton-product-grid"
import RefinementList from "@modules/store/components/refinement-list"
import { SortOptions } from "../components/refinement-list/sort-products"

import PaginatedProducts from "./paginated-products"

const StoreTemplate = ({
  sortBy,
  page,
  countryCode,
  categories,
  collections,
}: {
  sortBy?: SortOptions
  page?: string
  countryCode: string
  categories?: HttpTypes.StoreProductCategory[]
  collections?: HttpTypes.StoreCollection[]
}) => {
  const pageNumber = page ? parseInt(page) : 1
  const sort = sortBy || "created_at"

  return (
    <div
      className="flex flex-col py-6 content-container gap-y-8"
      data-testid="category-container"
    >
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

          <div className="w-full">
            <Suspense fallback={<SkeletonProductGrid />}>
              <PaginatedProducts
                sortBy={sort}
                page={pageNumber}
                countryCode={countryCode}
              />
            </Suspense>
          </div>
        </div>
      </div>
    </div>
  )
}

export default StoreTemplate
