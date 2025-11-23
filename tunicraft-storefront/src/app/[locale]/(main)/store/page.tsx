import { Metadata } from "next"

import { SortOptions } from "@modules/store/components/refinement-list/sort-products"
import StoreTemplate from "@modules/store/templates"

export const metadata: Metadata = {
  title: "Store",
  description: "Explore all of our products.",
}

type Props = {
  params: {
    locale: string
  }
  searchParams?: {
    sortBy?: SortOptions
    page?: string
  }
}

export default function StorePage(props: Props) {
  return <StoreTemplate {...props} />
}