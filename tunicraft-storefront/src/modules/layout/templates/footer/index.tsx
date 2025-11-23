import Image from "next/image"
import { listCategories } from "@lib/data/categories"
import { listCollections } from "@lib/data/collections"
import { Text } from "@medusajs/ui"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import MedusaCTA from "@modules/layout/components/medusa-cta"

type FooterProps = {
  locale: string
}

export default async function Footer({ locale }: FooterProps) {
  const { collections } = await listCollections({ fields: "*products" })
  const productCategories = await listCategories()

  return (
    <footer className="border-t border-ui-border-base w-full bg-sand">
      <div className="content-container flex flex-col w-full">
        <div className="flex flex-col gap-y-6 xsmall:flex-row items-start justify-between py-16">
          {/* ✅ Logo */}
          <div>
            <LocalizedClientLink href="/" locale={locale} className="flex items-center">
              <Image
                src="/logo-tunicraft.png"
                alt="TuniCraft Logo"
                width={120}
                height={32}
                priority
              />
            </LocalizedClientLink>
          </div>

          {/* ✅ Navigation */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-10 text-sm text-ui-fg-subtle">
            {/* Catégories */}
            {productCategories && (
              <div className="flex flex-col gap-2">
                <span className="text-ui-fg-base font-semibold">Catégories</span>
                <ul>
                  {productCategories.slice(0, 6).map((cat) =>
                    !cat.parent_category ? (
                      <li key={cat.id}>
                        <LocalizedClientLink
                          href={`/categories/${cat.handle}`}
                          locale={locale}
                          className="hover:text-ui-fg-base"
                        >
                          {cat.name}
                        </LocalizedClientLink>
                      </li>
                    ) : null
                  )}
                </ul>
              </div>
            )}

            {/* Collections */}
            {collections && (
              <div className="flex flex-col gap-2">
                <span className="text-ui-fg-base font-semibold">Collections</span>
                <ul>
                  {collections.slice(0, 6).map((col) => (
                    <li key={col.id}>
                      <LocalizedClientLink
                        href={`/collections/${col.handle}`}
                        locale={locale}
                        className="hover:text-ui-fg-base"
                      >
                        {col.title}
                      </LocalizedClientLink>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Réseaux sociaux */}
            <div className="flex flex-col gap-2">
              <span className="text-ui-fg-base font-semibold">Suivez-nous</span>
              <ul>
                <li>
                  <a
                    href="https://www.facebook.com/"
                    target="_blank"
                    rel="noreferrer"
                    className="hover:text-ui-fg-base"
                  >
                    Facebook
                  </a>
                </li>
                <li>
                  <a
                    href="https://www.instagram.com/"
                    target="_blank"
                    rel="noreferrer"
                    className="hover:text-ui-fg-base"
                  >
                    Instagram
                  </a>
                </li>
                <li>
                  <a
                    href="https://twitter.com/"
                    target="_blank"
                    rel="noreferrer"
                    className="hover:text-ui-fg-base"
                  >
                    X (Twitter)
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="flex justify-between items-center text-ui-fg-muted mb-8">
          <Text className="text-xs">
            © {new Date().getFullYear()} TuniCraft. Tous droits réservés.
          </Text>
          <MedusaCTA />
        </div>
      </div>
    </footer>
  )
}
