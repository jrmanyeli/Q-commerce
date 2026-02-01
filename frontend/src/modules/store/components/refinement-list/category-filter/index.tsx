"use client"

import { HttpTypes } from "@medusajs/types"
import { Text, clx } from "@medusajs/ui"
import Link from "next/link"
import { usePathname } from "next/navigation"

type CategoryFilterProps = {
    categories: HttpTypes.StoreProductCategory[]
    title?: string
    titleClassName?: string
    categoryClassName?: string
    countryCode?: string
}

const CategoryFilter = ({ categories, title = "Categories", titleClassName, categoryClassName, countryCode }: CategoryFilterProps) => {
    const pathname = usePathname()

    if (!categories?.length) {
        return null
    }

    return (
        <div className="flex flex-col gap-2">
            <Text className={clx("txt-compact-small-plus text-black font-semibold", titleClassName)}>{title}</Text>
            <ul className="flex flex-col gap-2">
                {categories.map((c) => (
                    <li key={c.id}>
                        <Link
                            href={`/${countryCode}/categories/${c.handle}`}
                            className={clx("txt-compact-small hover:text-gray-900 text-black", categoryClassName, {
                                "text-black font-semibold": pathname === `/${countryCode}/categories/${c.handle}`
                            })}
                        >
                            {c.name}
                        </Link>
                    </li>
                ))}
            </ul>
        </div>
    )
}

export default CategoryFilter
