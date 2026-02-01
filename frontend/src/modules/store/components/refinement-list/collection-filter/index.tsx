"use client"

import { HttpTypes } from "@medusajs/types"
import { Text, clx } from "@medusajs/ui"
import Link from "next/link"
import { usePathname } from "next/navigation"

type CollectionFilterProps = {
    collections: HttpTypes.StoreCollection[]
    countryCode?: string
}

const CollectionFilter = ({ collections, countryCode }: CollectionFilterProps) => {
    const pathname = usePathname()

    if (!collections?.length) {
        return null
    }

    return (
        <div className="flex flex-col gap-2">
            <Text className="txt-compact-small-plus text-black font-semibold">Collections</Text>
            <ul className="flex flex-col gap-2">
                {collections.map((c) => (
                    <li key={c.id}>
                        <Link
                            href={`/${countryCode}/collections/${c.handle}`}
                            className={clx("txt-compact-small hover:text-gray-900 text-black", {
                                "text-black font-semibold": pathname === `/${countryCode}/collections/${c.handle}`
                            })}
                        >
                            {c.title}
                        </Link>
                    </li>
                ))}
            </ul>
        </div>
    )
}

export default CollectionFilter
