import { listProductsWithSort } from "@lib/data/products"
import { NextRequest, NextResponse } from "next/server"

export async function GET(request: NextRequest) {
    try {
        const searchParams = request.nextUrl.searchParams
        const page = parseInt(searchParams.get("page") || "1")
        const countryCode = searchParams.get("countryCode") || "za"
        const sortBy = (searchParams.get("sortBy") || "created_at") as any
        const limit = parseInt(searchParams.get("limit") || "12")

        const collectionId = searchParams.get("collection_id")
        const categoryId = searchParams.get("category_id")
        const productIds = searchParams.get("id")

        const queryParams: any = {
            limit,
        }

        if (collectionId) {
            queryParams.collection_id = [collectionId]
        }

        if (categoryId) {
            queryParams.category_id = [categoryId]
        }

        if (productIds) {
            queryParams.id = productIds.split(",")
        }

        const {
            response: { products, count },
        } = await listProductsWithSort({
            page,
            queryParams,
            sortBy,
            countryCode,
        })

        return NextResponse.json({
            products,
            count,
            page,
        })
    } catch (error) {
        console.error("Error fetching products:", error)
        return NextResponse.json(
            { error: "Failed to fetch products" },
            { status: 500 }
        )
    }
}
