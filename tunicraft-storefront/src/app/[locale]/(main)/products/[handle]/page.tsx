import { Metadata } from "next"
import { notFound } from "next/navigation"
import { listProducts } from "@lib/data/products"
import { getRegion, listRegions } from "@lib/data/regions"
import ProductTemplate from "@modules/products/templates"

type Props = {
  params: {
    locale: string
    handle: string
  }
}

// Génération des chemins statiques pour toutes les combinaisons pays + produits
export async function generateStaticParams() {
  try {
    const countryCodes = await listRegions().then((regions) =>
      regions?.map((r) => r.countries?.map((c) => c.iso_2)).flat()
    )

    if (!countryCodes) return []

    const products = await listProducts({
      countryCode: "US", // fallback pour récupérer tous les handles
      queryParams: { fields: "handle" },
    }).then(({ response }) => response.products)

    return countryCodes
      .map((countryCode) =>
        products.map((product) => ({
          locale: `fr-${countryCode}`, // ou adapte dynamiquement selon langue par défaut
          handle: product.handle,
        }))
      )
      .flat()
      .filter((param) => param.handle)
  } catch (error) {
    console.error(
      `Failed to generate static paths for product pages: ${error instanceof Error ? error.message : "Unknown error"
      }.`
    )
    return []
  }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const [lang, countryCode] = params.locale.split("-")
  const { handle } = params

  const region = await getRegion(countryCode)
  if (!region) notFound()

  const product = await listProducts({
    countryCode,
    queryParams: { handle },
  }).then(({ response }) => response.products[0])

  if (!product) notFound()

  return {
    title: `${product.title} | TuniCraft`,
    description: product.description || product.title,
    openGraph: {
      title: `${product.title} | TuniCraft`,
      description: product.description || product.title,
      images: product.thumbnail ? [product.thumbnail] : [],
    },
  }
}

export default async function ProductPage({ params }: Props) {
  const [lang, countryCode] = params.locale.split("-")

  const region = await getRegion(countryCode)
  if (!region) notFound()

  const product = await listProducts({
    countryCode,
    queryParams: { handle: params.handle },
  }).then(({ response }) => response.products[0])

  if (!product) notFound()

  return (
    <ProductTemplate
      product={product}
      region={region}
      countryCode={countryCode}
    />
  )
}
