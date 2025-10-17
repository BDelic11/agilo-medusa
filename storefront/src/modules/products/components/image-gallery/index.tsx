"use client"

import React, { useState, useCallback, useEffect } from "react"
import useEmblaCarousel from "embla-carousel-react"
import Image from "next/image"
import Arrowleft from "components/icons/arrow-left"
import ArrowRight from "components/icons/arrow-right"
import { HttpTypes } from "@medusajs/types"

type ImageGalleryProps = {
  images: HttpTypes.StoreProductImage[]
}

const ImageGallery: React.FC<ImageGalleryProps> = ({ images }) => {
  const [selectedIndex, setSelectedIndex] = useState(0)
  const [canScrollPrev, setCanScrollPrev] = useState(false)
  const [canScrollNext, setCanScrollNext] = useState(false)

  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: false })

  const scrollPrev = useCallback(
    () => emblaApi && emblaApi.scrollPrev(),
    [emblaApi]
  )
  const scrollNext = useCallback(
    () => emblaApi && emblaApi.scrollNext(),
    [emblaApi]
  )
  const scrollTo = useCallback(
    (index: number) => emblaApi && emblaApi.scrollTo(index),
    [emblaApi]
  )

  const updateScrollButtons = useCallback(() => {
    if (!emblaApi) return
    setCanScrollPrev(emblaApi.canScrollPrev())
    setCanScrollNext(emblaApi.canScrollNext())
  }, [emblaApi])

  useEffect(() => {
    if (!emblaApi) return
    updateScrollButtons()
    emblaApi.on("select", () => {
      setSelectedIndex(emblaApi.selectedScrollSnap())
      updateScrollButtons()
    })
    emblaApi.on("reInit", updateScrollButtons)
  }, [emblaApi, updateScrollButtons])

  if (!images?.length) return null

  return (
    <div className="relative w-full md:w-1/2 flex flex-col items-center">
      <div className="relative overflow-hidden w-full" ref={emblaRef}>
        <div className="flex gap-4">
          {images.map((image, i) => (
            <div
              key={image.id || i}
              className="relative md:w-[459px] md:h-[612px] w-full h-[490px] shrink-0 overflow-hidden"
            >
              <Image
                src={image.url}
                alt={`Product image ${i + 1}`}
                fill
                priority={i === 0}
                className="object-cover"
              />
            </div>
          ))}
        </div>

        <button
          onClick={scrollPrev}
          disabled={!canScrollPrev}
          className={`hidden md:block absolute left-3 top-1/2 -translate-y-1/2 transition p-2 rounded-full border-black border-[1px] ${
            canScrollPrev
              ? "bg-black hover:bg-gray-900"
              : "bg-transparent opacity-75 cursor-default"
          }`}
        >
          <Arrowleft color={canScrollPrev ? "#ffffff" : "#050505"} />{" "}
        </button>

        <button
          onClick={scrollNext}
          disabled={!canScrollNext}
          className={`hidden md:block absolute right-3 top-1/2 -translate-y-1/2 transition p-2 rounded-full border-black border-[1px] ${
            canScrollNext
              ? "bg-black hover:bg-gray-900"
              : "bg-transparent opacity-75 cursor-default"
          }`}
        >
          <ArrowRight color={canScrollNext ? "#ffffff" : "#050505"} />
        </button>
      </div>

      <div className="absolute md:relative bottom-4 md:bottom-0 mx-auto md:mx-0 flex flex-row md:justify-center md:ml-[270px] gap-1 md:mt-6">
        {images.map((_, i) => (
          <button
            key={i}
            onClick={() => scrollTo(i)}
            className="flex flex-col items-center text-sm text-gray-700"
          >
            <span
              className={`transition-colors duration-300 ${
                selectedIndex === i ? "text-black font-medium" : "text-gray-400"
              }`}
            >
              {i + 1}
            </span>
            <span
              className={`block mt-1 ml-2 h-[1px] w-[14px] rounded-full transition-all duration-300 ${
                selectedIndex === i ? "bg-black w-6" : "bg-transparent w-4"
              }`}
            />
          </button>
        ))}
      </div>
    </div>
  )
}

export default ImageGallery
