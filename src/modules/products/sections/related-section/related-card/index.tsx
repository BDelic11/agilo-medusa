import Image from "next/image"

interface RelatedCardProps {
  relatedProduct: {
    image: string
    title: string
    collection?: string
    price?: number
    discountPrice?: number
  }
}

const RelatedCard = ({ relatedProduct }: RelatedCardProps) => {
  const { image, title, price, discountPrice, collection } = relatedProduct

  return (
    <article className="flex flex-col items-start w-[163px] md:w-[384px]">
      {/* image container */}
      <div className="relative h-[163px] md:h-[286px] w-full overflow-hidden">
        <Image
          src={image}
          alt={title}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 163px, 384px"
          priority={false}
        />
      </div>

      <figcaption className="mt-3 w-full">
        {/* desktop */}
        <div className="hidden md:grid md:grid-cols-[1fr,auto] md:gap-y-1">
          <h3 className="col-start-1 row-start-1 font-normal text-base text-B&W-Black leading-[140%]">
            {title}
          </h3>
          <p className="col-start-2 row-start-1 text-right font-semibold text-base text-B&W-Black leading-[140%]">
            {price}€
          </p>

          {collection ? (
            <p className="col-start-1 row-start-2 text-sm font-normal text-Grays-Gray-500 leading-[140%]">
              {collection}
            </p>
          ) : (
            <span className="col-start-1 row-start-2" />
          )}

          {discountPrice && (
            <p className="col-start-2 row-start-2 text-right font-semibold text-Grays-Gray-500 line-through">
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
