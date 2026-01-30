"use client"

import { HttpTypes } from "@medusajs/types"
import ProductPreview from "@modules/products/components/product-preview"
import { useEffect, useRef, useState, useCallback } from "react"
import { SortOptions } from "@modules/store/components/refinement-list/sort-products"

type InfiniteScrollProductsProps = {
    initialProducts: HttpTypes.StoreProduct[]
    region: HttpTypes.StoreRegion
    count: number
    limit?: number
    sortBy?: SortOptions
    collectionId?: string
    categoryId?: string
    productsIds?: string[]
    countryCode: string
}

export function InfiniteScrollProducts({
    initialProducts,
    region,
    count,
    limit = 12,
    sortBy,
    collectionId,
    categoryId,
    productsIds,
    countryCode,
}: InfiniteScrollProductsProps) {
    const [products, setProducts] = useState<HttpTypes.StoreProduct[]>(initialProducts)
    const [page, setPage] = useState(1)
    const [loading, setLoading] = useState(false)
    const [hasMore, setHasMore] = useState(count > initialProducts.length)
    const observerTarget = useRef<HTMLDivElement>(null)

    const loadMoreProducts = useCallback(async () => {
        if (loading || !hasMore) return

        setLoading(true)

        try {
            const nextPage = page + 1
            const queryParams: any = {
                limit,
            }

            if (collectionId) {
                queryParams.collection_id = [collectionId]
            }

            if (categoryId) {
                queryParams.category_id = [categoryId]
            }

            if (productsIds) {
                queryParams.id = productsIds
            }

            const response = await fetch(
                `/api/products/list?page=${nextPage}&countryCode=${countryCode}&sortBy=${sortBy || "created_at"}&${new URLSearchParams(queryParams).toString()}`
            )

            if (!response.ok) {
                throw new Error("Failed to fetch products")
            }

            const data = await response.json()
            const newProducts = data.products || []

            setProducts((prev) => [...prev, ...newProducts])
            setPage(nextPage)
            setHasMore(products.length + newProducts.length < count)
        } catch (error) {
            console.error("Error loading more products:", error)
        } finally {
            setLoading(false)
        }
    }, [loading, hasMore, page, limit, collectionId, categoryId, productsIds, countryCode, sortBy, count, products.length])

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                if (entries[0].isIntersecting && hasMore && !loading) {
                    loadMoreProducts()
                }
            },
            { threshold: 0.1 }
        )

        const currentTarget = observerTarget.current

        if (currentTarget) {
            observer.observe(currentTarget)
        }

        return () => {
            if (currentTarget) {
                observer.unobserve(currentTarget)
            }
        }
    }, [loadMoreProducts, hasMore, loading])

    return (
        <>
            <ul
                className="grid grid-cols-2 w-full small:grid-cols-3 medium:grid-cols-4 gap-x-6 gap-y-8"
                data-testid="products-list"
            >
                {products.map((p) => (
                    <li key={p.id}>
                        <ProductPreview product={p} region={region} />
                    </li>
                ))}
            </ul>

            {hasMore && (
                <div
                    ref={observerTarget}
                    className="flex justify-center w-full mt-12 mb-8"
                >
                    {loading ? (
                        <div className="flex items-center gap-2 text-ui-fg-subtle">
                            <svg
                                className="animate-spin h-5 w-5"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                            >
                                <circle
                                    className="opacity-25"
                                    cx="12"
                                    cy="12"
                                    r="10"
                                    stroke="currentColor"
                                    strokeWidth="4"
                                />
                                <path
                                    className="opacity-75"
                                    fill="currentColor"
                                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                                />
                            </svg>
                            <span className="txt-small-plus">Loading more products...</span>
                        </div>
                    ) : (
                        <div className="h-8" />
                    )}
                </div>
            )}
        </>
    )
}
