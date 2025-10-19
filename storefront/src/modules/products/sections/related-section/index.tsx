import SectionTitle from "components/_ui/section-title"
import RelatedCard from "./related-card"
import { HttpTypes } from "@medusajs/types"
import { getRegion } from "@lib/data/regions"
import { listProducts } from "@lib/data/products"

interface RelatedSectionProps {
  product: HttpTypes.StoreProduct
  countryCode: string
}

const TARGET = 2

const RelatedSection = async ({
  product,
  countryCode,
}: RelatedSectionProps) => {
  const region = await getRegion(countryCode)

  if (!region) {
    return null
  }

  const primaryCategoryId =
    product.categories?.[0]?.id || product.categories?.[0]?.id

  const fetchList = async (qp: HttpTypes.StoreProductListParams) => {
    const { response } = await listProducts({
      queryParams: {
        ...qp,
        region_id: region.id,
        is_giftcard: false,
        limit: 24,
      },
      countryCode,
    })
    return response.products.filter((p) => p.id !== product.id)
  }

  let related: HttpTypes.StoreProduct[] = []
  if (primaryCategoryId) {
    related = await fetchList({ category_id: [primaryCategoryId] })
  }

  if (related.length < TARGET) {
    const more = await fetchList({})
    const seen = new Set(related.map((p) => p.id).concat(product.id))
    for (const p of more) {
      if (!seen.has(p.id)) related.push(p)
      if (related.length >= TARGET) break
    }
  }
  return (
    <section className="flex flex-col px-4 py-[104px] md:py-[144px] gap-8 md:px-24  md:gap-[64px] mx-auto w-full max-w-[1600px] transition-all duration-1000 ">
      <SectionTitle>Related products</SectionTitle>

      {/* related container */}
      <ul className="grid grid-cols-2 md:grid-cols-3 gap-6 md:gap-12 w-full">
        {related.map((product) => (
          <li key={product.id} className="list-none">
            <RelatedCard relatedProduct={product} />
          </li>
        ))}
      </ul>
    </section>
  )
}

export default RelatedSection
