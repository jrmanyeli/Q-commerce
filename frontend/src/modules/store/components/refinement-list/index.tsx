"use client"



import { Popover, PopoverButton, PopoverPanel, Transition } from "@headlessui/react"
import { ChevronDown, Funnel, ArrowUpDown } from "@medusajs/icons"
import { Text, clx } from "@medusajs/ui"
import { Fragment, useCallback } from "react"
import { usePathname, useRouter, useSearchParams } from "next/navigation"

import { SortOptions } from "./sort-products"
import CollectionFilter from "./collection-filter"
import CategoryFilter from "./category-filter"
import SortProducts from "./sort-products"
import { HttpTypes } from "@medusajs/types"

type RefinementListProps = {
  sortBy: SortOptions
  search?: boolean
  collections?: HttpTypes.StoreCollection[]
  categories?: HttpTypes.StoreProductCategory[]
  'data-testid'?: string
  isSidebar?: boolean
  countryCode: string
}

const RefinementList = ({
  sortBy,
  collections,
  categories,
  'data-testid': dataTestId,
  isSidebar = false,
  countryCode
}: RefinementListProps) => {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams)
      params.set(name, value)

      return params.toString()
    },
    [searchParams]
  )

  const setQueryParams = (name: string, value: string) => {
    const query = createQueryString(name, value)
    router.push(`${pathname}?${query}`, { scroll: false })
  }

  if (isSidebar) {
    return (
      <div className="flex flex-col gap-y-8 w-full py-2">
        <SortProducts sortBy={sortBy} setQueryParams={setQueryParams} />
        {categories && categories.length > 0 && (
          <CategoryFilter categories={categories} countryCode={countryCode} />
        )}
        {collections && collections.length > 0 && (
          <CollectionFilter collections={collections} countryCode={countryCode} />
        )}
      </div>
    )
  }

  return (
    <div className="w-full bg-white small:hidden">
      <div className="flex items-center justify-between gap-x-3 py-3">
        <div className="flex-1">
          <Popover className="relative w-full">
            <PopoverButton className="flex items-center justify-center w-full py-3 px-4 border border-gray-300 rounded-md bg-white text-gray-700 hover:bg-gray-50 transition-colors focus:outline-none focus:ring-2 focus:ring-gray-200">
              <span className="text-sm font-normal">Filter</span>
            </PopoverButton>

            <Transition
              as={Fragment}
              enter="transition ease-out duration-200"
              enterFrom="opacity-0 translate-y-1"
              enterTo="opacity-100 translate-y-0"
              leave="transition ease-in duration-150"
              leaveFrom="opacity-100 translate-y-0"
              leaveTo="opacity-0 translate-y-1"
            >
              <PopoverPanel className="absolute left-0 z-50 mt-3 w-screen max-w-sm transform px-4 sm:px-0 lg:max-w-md">
                <div className="overflow-hidden rounded-lg shadow-lg ring-1 ring-black ring-opacity-5 bg-white p-6">
                  <div className="flex flex-col gap-y-8">
                    {collections && collections.length > 0 && (
                      <CollectionFilter collections={collections} countryCode={countryCode} />
                    )}
                    {categories && categories.length > 0 && (
                      <CategoryFilter categories={categories} countryCode={countryCode} />
                    )}
                  </div>
                </div>
              </PopoverPanel>
            </Transition>
          </Popover>
        </div>

        <div className="flex-shrink-0">
          <Popover className="relative">
            <PopoverButton className="flex items-center justify-center p-3 border border-gray-300 rounded-md bg-white text-gray-700 hover:bg-gray-50 transition-colors focus:outline-none focus:ring-2 focus:ring-gray-200">
              <ArrowUpDown size={20} />
            </PopoverButton>

            <Transition
              as={Fragment}
              enter="transition ease-out duration-200"
              enterFrom="opacity-0 translate-y-1"
              enterTo="opacity-100 translate-y-0"
              leave="transition ease-in duration-150"
              leaveFrom="opacity-100 translate-y-0"
              leaveTo="opacity-0 translate-y-1"
            >
              <PopoverPanel className="absolute right-0 z-50 mt-3 w-48 transform px-4 sm:px-0">
                <div className="overflow-hidden rounded-lg shadow-lg ring-1 ring-black ring-opacity-5 bg-white p-4">
                  <SortProducts sortBy={sortBy} setQueryParams={setQueryParams} />
                </div>
              </PopoverPanel>
            </Transition>
          </Popover>
        </div>
      </div>
    </div>
  )
}

export default RefinementList
