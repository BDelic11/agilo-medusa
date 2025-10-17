import FirstSectionProduct from "../sections/first-section"
import CollectionSection from "../sections/collection-section"
import RelatedSection from "../sections/related-section"
import { HttpTypes } from "@medusajs/types"

type ProductTemplateProps = {
  product: HttpTypes.StoreProduct
  region: HttpTypes.StoreRegion
  countryCode: string
}

const ProductTemplate: React.FC<ProductTemplateProps> = ({
  product,
  region,
  countryCode,
}) => {
  if (!product || !product.id) {
    return notFound()
  }

  return (
    <>
      <FirstSectionProduct product={product} region={region} />
      <CollectionSection product={product} />
      <RelatedSection />
    </>
  )
}

export default ProductTemplate
