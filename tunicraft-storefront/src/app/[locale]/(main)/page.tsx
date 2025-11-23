import { Metadata } from "next"

import FeaturedProducts from "@modules/home/components/featured-products"
import Hero from "@modules/home/components/hero"
import { listCollections } from "@lib/data/collections"
import { getRegion } from "@lib/data/regions"
import { getMessages } from "@lib/i18n/useTranslations"
import ChatWidget from "@modules/chatbot/components/chatWidget"


export const metadata: Metadata = {
  title: "TuniCraft",
  description:
    "TuniCraft: Découvrez l’âme de l’artisanat" +
    "tunisien à travers notre boutique en ligne.Explorez une sélection unique de tapis berbères, poteries de Nabeul, " +
    "bijoux en argent, vêtements traditionnels et délices gastronomiques, tous faits main par des artisans passionnés.Plongez dans la richesse de la culture tunisienne et ramenez chez vous un morceau d’authenticité.",
}

export default async function Home(props: {
  params: Promise<{ locale: string }>
}) {

  const params = await props.params

  const [lang, countryCode] = params.locale.split("-")

  const region = await getRegion(countryCode)

  const messages = await getMessages(lang)

  const { collections } = await listCollections({
    fields: "id, handle, title",
  })

  if (!collections || !region) {
    return null
  }
  console.log("countryCode:", countryCode)
  console.log("region:", region)

  return (
    <>
      <Hero title={messages["hero_title"]}
        subtitle={messages["hero_subtitle"]}
        buttonText={messages["hero_button"]} />
      <div className="py-12">
        <ul className="flex flex-col gap-x-6">
          <FeaturedProducts collections={collections} region={region} />
        </ul>
      </div>
      <ChatWidget />

    </>
  )
}
