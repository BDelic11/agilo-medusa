"use client"

import ImageGallery from "@modules/products/components/image-gallery"
import ProductActions from "@modules/products/components/product-actions"
import { HttpTypes } from "@medusajs/types"

type FirstSectionProductProps = {
  product: HttpTypes.StoreProduct
  region: HttpTypes.StoreRegion
}

const FirstSectionProduct = ({ product, region }: FirstSectionProductProps) => {
  return (
    <section className="w-full flex flex-col md:flex-row py-0 px-0 md:py-16 md:px-24 md:items-start mx-auto max-w-[1600px]">
      {/* images */}
      <ImageGallery images={product?.images || []} />

      {/* info */}
      <div className="w-full md:w-full px-4 pt-8 md:px-0 md:pl-[30px] md:pt-0 md:py-16 h-[611px] md:h-[810px] flex flex-col gap-8 justify-start items-start ">
        <div className="flex flex-col gap-2 items-start">
          {product.collection && (
            <p className="text-base text-Grays-Gray-500 leading-[140%]">
              {product.collection.title}
            </p>
          )}
          <h1 className="font-semibold text-2xl md:text-[40px] text-B&W-Black leading-[140%]">
            {product.title}
          </h1>
          <p className="text-2xl font-normal text-B&W-Black leading-[140%]">
            €{product?.variants?.[0]?.calculated_price?.calculated_amount || 0}
          </p>
        </div>

        <p className="text-xs md:text-base font-normal leading-[140%] md:text-B&W-Black text-Grays-Gray-500 w-full max-w-[480px]">
          {product.description}
        </p>

        <ProductActions product={product} region={region} />

        <p className="text-base font-normal text-Grays-Gray-500">
          Estimate delivery 2–3 days
        </p>
      </div>
    </section>
  )
}

export default FirstSectionProduct
