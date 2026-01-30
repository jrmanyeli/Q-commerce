import { notFound } from "next/navigation"
import { Suspense, Fragment } from "react"

import InteractiveLink from "@modules/common/components/interactive-link"
import SkeletonProductGrid from "@modules/skeletons/templates/skeleton-product-grid"
import RefinementList from "@modules/store/components/refinement-list"
import { SortOptions } from "@modules/store/components/refinement-list/sort-products/index"
import PaginatedProducts from "@modules/store/templates/paginated-products"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import { HttpTypes } from "@medusajs/types"

export default function CategoryTemplate({
  category,
  categories,
  collections,
  sortBy,
  page,
  countryCode,
}: {
  category: HttpTypes.StoreProductCategory
  categories?: HttpTypes.StoreProductCategory[]
  collections?: HttpTypes.StoreCollection[]
  sortBy?: SortOptions
  page?: string
  countryCode: string
}) {
  const pageNumber = page ? parseInt(page) : 1
  const sort = sortBy || "created_at"

  if (!category || !countryCode) notFound()

  const parents = [] as HttpTypes.StoreProductCategory[]

  const getParents = (category: HttpTypes.StoreProductCategory) => {
    if (category.parent_category) {
      parents.push(category.parent_category)
      getParents(category.parent_category)
    }
  }

  getParents(category)

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
            data-testid="sort-by-container"
          />

          <div className="flex flex-col mb-8 mt-4 small:mt-0">
            <div className="flex items-center gap-x-2 text-ui-fg-subtle txt-compact-small uppercase tracking-widest mb-2">
              {parents &&
                parents.map((parent) => (
                  <Fragment key={parent.id}>
                    <LocalizedClientLink
                      className="hover:text-black transition-colors"
                      href={`/categories/${parent.handle}`}
                    >
                      {parent.name}
                    </LocalizedClientLink>
                    <span>/</span>
                  </Fragment>
                ))}
            </div>


            {category.description && (
              <div className="max-w-[800px] text-ui-fg-subtle text-base-regular leading-relaxed">
                <p>{category.description}</p>
              </div>
            )}

            {category.category_children && category.category_children.length > 0 && (
              <div className="mt-6 flex flex-wrap gap-2">
                {category.category_children?.map((c) => (
                  <LocalizedClientLink
                    key={c.id}
                    href={`/categories/${c.handle}`}
                    className="px-4 py-2 bg-gray-100 hover:bg-gray-200 transition-colors rounded-full text-sm font-medium text-ui-fg-base"
                  >
                    {c.name}
                  </LocalizedClientLink>
                ))}
              </div>
            )}
          </div>

          <Suspense
            fallback={
              <SkeletonProductGrid
                numberOfProducts={category.products?.length ?? 8}
              />
            }
          >
            <PaginatedProducts
              sortBy={sort}
              page={pageNumber}
              categoryId={category.id}
              countryCode={countryCode}
            />
          </Suspense>
        </div>
      </div>
    </div>
  )
}
