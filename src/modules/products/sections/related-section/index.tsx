import { Product } from "@medusajs/js-sdk/dist/admin/product"
import SectionTitle from "components/_ui/SectionTitle"
import RelatedCard from "./related-card"

const RelatedSection = () => {
  interface RelatedProduct {
    id: string
    title: string
    collection: string
    price?: number
    discountPrice?: number
    image: string
  }

  const relatedProducts: RelatedProduct[] = [
    {
      id: "1",
      title: "Product 1",
      collection: "Collection A",
      price: 100,
      discountPrice: 80,
      image: "/images/collections/collection-1.png",
    },
    {
      id: "2",
      title: "Product 2",
      collection: "Collection B",
      price: 150,
      discountPrice: 80,

      image: "/images/collections/collection-1.png",
    },
    {
      id: "3",
      title: "Product 3",
      collection: "Collection C",
      price: 200,
      discountPrice: 80,
      image: "/images/collections/collection-1.png",
    },
  ]

  return (
    <section className="flex flex-col px-4 py-[104px] gap-8 md:px-24 md:py-[144px] md:gap-[64px] mx-auto w-full max-w-[1440px]">
      <SectionTitle>Related products</SectionTitle>

      {/* related container */}
      <ul className="grid grid-cols-2 md:grid-cols-3 gap-6 md:gap-12 w-full">
        {relatedProducts.map((product) => (
          <li key={product.id} className="list-none">
            <RelatedCard relatedProduct={product} />
          </li>
        ))}
      </ul>
    </section>
  )
}

export default RelatedSection
