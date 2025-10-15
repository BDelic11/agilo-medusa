import Image from "next/image"
import Link from "next/link"

interface RelatedCardProps {
  relatedProduct: {
    image: string
    title: string
    collection?: string
    price?: number
    discountPrice?: number
    id: string
  }
}

const RelatedCard = ({ relatedProduct }: RelatedCardProps) => {
  const { image, title, price, discountPrice, collection } = relatedProduct

  return (
    <article className="flex flex-col items-start w-[163px] md:w-[384px]">
      {/* image container */}
      <Link
        href={"products/" + relatedProduct.id}
        className="relative h-[163px] md:h-[286px] w-full overflow-hidden"
      >
        <Image
          src={image}
          alt={title}
          fill
          className="object-cover transition-transform duration-500 ease-in-out hover:scale-105"
          sizes="(max-width: 768px) 163px, 384px"
          priority={false}
        />
      </Link>

      <figcaption className="mt-6 w-full">
        {/* desktop */}
        <div className="hidden md:grid md:grid-cols-[1fr,auto] leading-[140%]">
          <h3 className="col-start-1 row-start-1 font-normal text-base text-B&W-Black ">
            {title}
          </h3>

          <p
            className={`${
              discountPrice ? "text-Error-Red" : "text-B&W-Black"
            } col-start-2 row-start-1 text-right font-semibold text-xs md:text-base  `}
          >
            {price}€
          </p>

          {collection ? (
            <p className="col-start-1 row-start-2 text-sm font-normal text-Grays-Gray-500 ">
              {collection}
            </p>
          ) : (
            <span className="col-start-1 row-start-2" />
          )}

          {discountPrice && (
            <p className="col-start-2 row-start-2 text-right font-normal text-Grays-Gray-500 line-through text-xs md:text-base">
              {discountPrice}€
            </p>
          )}
        </div>

        {/* mobile */}
        <div className="md:hidden flex flex-col gap-1">
          <h3 className="font-normal text-xs text-B&W-Black leading-[140%]">
            {title}
          </h3>

          {collection && (
            <p className="text-xs font-normal text-Grays-Gray-500 leading-[140%]">
              {collection}
            </p>
          )}

          <div className="flex items-center justify-between">
            <p className="font-semibold text-B&W-Black text-xs leading-[140%]">
              {price}€
            </p>
            {discountPrice && (
              <p className="font-semibold text-Grays-Gray-500 line-through text-xs leading-[140%]">
                {discountPrice}€
              </p>
            )}
          </div>
        </div>
      </figcaption>
    </article>
  )
}

export default RelatedCard
