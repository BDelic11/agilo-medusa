"use client"
import { useIntersection } from "@lib/hooks/use-in-view"
import { HttpTypes } from "@medusajs/types"
import SectionTitle from "components/_ui/section-title"
import Image from "next/image"
import Link from "next/link"
import React, { useRef } from "react"

interface CollectionSectionProps {
  product: HttpTypes.StoreProduct
}

const CollectionSection = ({ product }: CollectionSectionProps) => {
  const sectionRef = useRef<HTMLDivElement>(null)
  const isVisible = useIntersection(sectionRef, "0px", 0.1)

  return (
    <section
      ref={sectionRef}
      className={`flex flex-col mx-auto gap-8 md:gap-20 w-full pt-[204px] md:pt-0 max-w-[1600px] transition-all duration-1000 ${
        isVisible
          ? "animate-fade-in-up animate-delay-[300ms]"
          : "opacity-0 translate-y-8"
      }`}
    >
      {/* first part */}
      <div className="flex flex-col gap-8 font-medium md:text-5xl leading-[140%] px-4 md:px-24">
        <SectionTitle>Collection Inspired Interior</SectionTitle>
        <div className="relative w-full h-60 md:h-[702px]">
          <Image
            src="/images/collections/collection-1.png"
            alt="Collection image 1"
            fill
            quality={80}
            sizes="(max-width: 768px) 100vw, 1440px"
            className="object-cover"
          />
        </div>
      </div>

      {/* second part */}
      <div className="relative w-full h-60 md:h-[809px] lg:max-h-[900px]">
        <Image
          src="/images/collections/collection-2.png"
          alt="Collection image 2"
          fill
          quality={80}
          sizes="(max-width: 768px) 100vw, 1440px"
          className="object-cover"
        />
      </div>

      {/* third part */}
      <div className="flex flex-col gap-8 md:gap-[108px] md:w-full md:flex-row md:justify-between px-4 md:px-24 ">
        <div className="relative w-[240px] h-[343px] md:w-[492px] md:h-[656px]">
          <Image
            src="/images/collections/collection-3.png"
            alt="Collection image 3"
            fill
            className="object-cover"
            sizes="(max-width: 768px) 240px, 492px"
            quality={85}
          />
        </div>

        <div className="flex flex-col md:w-[648px] h-auto gap-8 md:mt-20">
          <SectionTitle>
            The {product.title} sofa is a masterpiece of minimalism and luxury.
          </SectionTitle>
          <Link
            href={"/collections/" + product.collection?.handle}
            className="border-b-B&W-Black border-b-[1px] font-normal text-base md:text-2xl leading-[140%] w-fit"
          >
            See more out of ‘{product.collection?.title}’ collection
          </Link>
        </div>
      </div>
    </section>
  )
}

export default CollectionSection
