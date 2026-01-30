import { Metadata } from "next"
import { listCategories } from "@lib/data/categories"
import { listCollections } from "@lib/data/collections"
import { SortOptions } from "@modules/store/components/refinement-list/sort-products/index"
import StoreTemplate from "@modules/store/templates"

export const metadata: Metadata = {
  title: "Store",
  description: "Explore all of our products.",
}

type Params = {
  searchParams: Promise<{
    sortBy?: SortOptions
    page?: string
  }>
  params: Promise<{
    countryCode: string
  }>
}

export default async function StorePage(props: Params) {
  const params = await props.params;
  const searchParams = await props.searchParams;
  const { sortBy, page } = searchParams

  const categories = await listCategories()
  const { collections } = await listCollections()

  return (
    <StoreTemplate
      sortBy={sortBy}
      page={page}
      countryCode={params.countryCode}
      categories={categories}
      collections={collections}
    />
  )
}
