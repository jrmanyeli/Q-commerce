"use client"

import { Text, clx } from "@medusajs/ui"

export type SortOptions = "price_asc" | "price_desc" | "created_at"

type SortProductsProps = {
    sortBy: SortOptions
    setQueryParams: (name: string, value: string) => void
    'data-testid'?: string
}

const sortOptions = [
    {
        value: "created_at",
        label: "Latest Arrivals",
    },
    {
        value: "price_asc",
        label: "Price: Low -> High",
    },
    {
        value: "price_desc",
        label: "Price: High -> Low",
    },
]

const SortProducts = ({ sortBy, setQueryParams, 'data-testid': dataTestId }: SortProductsProps) => {
    return (
        <div className="flex flex-col gap-2" data-testid={dataTestId}>
            <Text className="txt-compact-small-plus text-black font-semibold">Sort By</Text>
            <ul className="flex flex-col gap-2">
                {sortOptions.map((option) => (
                    <li key={option.value} className="flex items-center gap-2">
                        <button
                            className={clx("text-left txt-compact-small hover:text-gray-900 text-black", {
                                "text-black font-semibold": sortBy === option.value
                            })}
                            onClick={() => setQueryParams("sortBy", option.value)}
                        >
                            {option.label}
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    )
}

export default SortProducts
