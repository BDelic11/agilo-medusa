import { getProductPrice } from "@lib/util/get-product-price"
import { HttpTypes } from "@medusajs/types"
import Image from "next/image"
import Link from "next/link"

interface RelatedCardProps {
  relatedProduct: HttpTypes.StoreProduct
}

const RelatedCard = ({ relatedProduct }: RelatedCardProps) => {
  const { images, title, collection } = relatedProduct

  const { cheapestPrice } = getProductPrice({
    product: relatedProduct,
  })

  const isLoading = !cheapestPrice
  const isSale = !!cheapestPrice && cheapestPrice.price_type === "sale"

  const currentPriceText = cheapestPrice?.calculated_price_number / 100
  const originalPriceText = cheapestPrice?.original_price_number / 100

  return (
    <article className="flex flex-col items-start w-[163px] md:w-[384px]">
      {/* image container */}
      <Link
        href={`/products/${relatedProduct.handle}`}
        className="relative h-[163px] md:h-[286px] w-full overflow-hidden"
      >
        {images && images.length > 0 && (
          <Image
            src={images[0].url}
            alt={title}
            fill
            className="object-cover transition-transform duration-500 ease-in-out hover:scale-105"
            sizes="(max-width: 768px) 163px, 384px"
            priority={false}
          />
        )}
      </Link>

      <figcaption className="mt-6 w-full">
        <div className="hidden md:grid md:grid-cols-[1fr,auto] leading-[140%]">
          <h3 className="col-start-1 row-start-1 font-normal text-base text-B&W-Black ">
            {title}
          </h3>

          <p
            className={`${
              isSale ? "text-Error-Red" : "text-B&W-Black"
            } col-start-2 row-start-1 text-right font-semibold text-xs md:text-base`}
          >
            {isLoading ? "—" : currentPriceText}€
          </p>

          {collection ? (
            <p className="col-start-1 row-start-2 text-sm font-normal text-Grays-Gray-500 ">
              {collection.title}
            </p>
          ) : (
            <span className="col-start-1 row-start-2" />
          )}

          {isSale && (
            <p className="col-start-2 row-start-2 text-right font-normal text-Grays-Gray-500 line-through text-xs md:text-base">
              {originalPriceText}
            </p>
          )}
        </div>

        <div className="md:hidden flex flex-col gap-1">
          <h3 className="font-normal text-xs text-B&W-Black leading-[140%]">
            {title}
          </h3>
          <div className="flex items-center justify-between">
            <p className="font-semibold text-B&W-Black text-xs leading-[140%]">
              {isLoading ? "—" : currentPriceText}
            </p>
            {isSale && (
              <p className="text-Error-Red font-semibold line-through text-xs leading-[140%]">
                {originalPriceText}€
              </p>
            )}
          </div>
        </div>
      </figcaption>
    </article>
  )
}

export default RelatedCard
