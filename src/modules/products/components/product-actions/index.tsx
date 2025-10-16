"use client"

import { useState, useMemo } from "react"
import { useParams } from "next/navigation"
import { HttpTypes } from "@medusajs/types"
import { addToCart } from "@lib/data/cart"
import { Button } from "components/_ui/button"
import QuantityButton from "components/_ui/quantity-button.tsx"

const COLOR_MAP: Record<string, string> = {
  White: "#FFFFFF",
  Black: "#050505",
  "Dark Gray": "#3A3A3A",
}

type ProductActionsProps = {
  product: HttpTypes.StoreProduct
  region: HttpTypes.StoreRegion
}

export default function ProductActions({
  product,
  region,
}: ProductActionsProps) {
  const [selectedMaterial, setSelectedMaterial] = useState<string | undefined>()
  const [selectedColor, setSelectedColor] = useState<string | undefined>()
  const [quantity, setQuantity] = useState(1)
  const [isAdding, setIsAdding] = useState(false)
  const countryCode = useParams().countryCode as string

  const materials =
    product.options?.find((o) => o.title.toLowerCase() === "material")
      ?.values || []
  const colors =
    product.options?.find((o) => o.title.toLowerCase() === "color")?.values ||
    []

  const selectedVariant = useMemo(() => {
    return product.variants?.find((variant) => {
      const variantOptions = Object.fromEntries(
        variant.options?.map((o) => [o.option_id, o.value]) || []
      )
      const materialId = product.options?.find(
        (o) => o.title.toLowerCase() === "material"
      )?.id
      const colorId = product.options?.find(
        (o) => o.title.toLowerCase() === "color"
      )?.id

      const matchMaterial = materialId
        ? variantOptions[materialId] === selectedMaterial
        : true
      const matchColor = colorId
        ? variantOptions[colorId] === selectedColor
        : true

      return matchMaterial && matchColor
    })
  }, [selectedMaterial, selectedColor, product])

  const handleAddToCart = async () => {
    if (!selectedVariant?.id) return
    setIsAdding(true)
    await addToCart({
      variantId: selectedVariant.id,
      quantity,
      countryCode,
    })
    setIsAdding(false)
  }

  return (
    <>
      <div className="flex flex-col items-start justify-start gap-8 md:gap-6 w-full max-w-full md:max-w-[243px] mt-8 md:mt-16">
        {/* materijali */}
        {materials.length > 0 && (
          <div className="flex flex-col gap-2">
            <div className="flex flex-row text-base font-normal justify-start gap-6">
              <p className="text-B&W-Black">Materials</p>
              <p className="text-Grays-Gray-500">{selectedMaterial}</p>
            </div>
            <div className="relative w-full">
              <select
                value={selectedMaterial || ""}
                onChange={(e) => setSelectedMaterial(e.target.value)}
                className="appearance-none border border-gray-300 text-sm px-3 py-2 pr-10 rounded-base focus:outline-none w-full"
              >
                <option value="">Select material</option>
                {materials.map((m) => (
                  <option key={m.id} value={m.value}>
                    {m.value}
                  </option>
                ))}
              </select>

              <svg
                className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M6 9L12 15L18 9"
                  stroke="#050505"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
          </div>
        )}

        {/* boje */}
        {colors.length > 0 && (
          <div className="flex flex-col gap-2">
            <div className="flex flex-row text-base font-normal  justify-start gap-6">
              <p className="text-B&W-Black">Colors</p>
              <p className="text-Grays-Gray-500">{selectedColor}</p>
            </div>
            <div className="flex gap-6 flex-wrap">
              {colors.map((c) => (
                <button
                  key={c.id}
                  onClick={() => setSelectedColor(c.value)}
                  className={`relative w-8 h-8 border border-gray-200 ${
                    selectedColor === c.value
                      ? "after:absolute after:-bottom-[8px] after:left-0 after:w-full after:h-[1px] after:bg-black"
                      : ""
                  }`}
                  style={{
                    backgroundColor:
                      COLOR_MAP[c.value] || c.value.toLowerCase(),
                  }}
                />
              ))}
            </div>
          </div>
        )}

        {/* botuni */}
        <div className="flex flex-col md:flex-row items-center gap-3 pt-8 md:pt-24 w-full md:w-[540px]">
          <div className="flex items-center border border-gray-300 rounded-[4px] h-12 w-full md:w-auto justify-center">
            <QuantityButton
              className="pl-6"
              setQuantity={() => setQuantity((q) => Math.max(1, q - 1))}
            >
              –
            </QuantityButton>
            <span className="px-4 font-normal text-xl">{quantity}</span>

            <QuantityButton
              className="pr-6"
              setQuantity={() => setQuantity((q) => q + 1)}
            >
              +
            </QuantityButton>
          </div>

          <Button
            onClick={handleAddToCart}
            disabled={!selectedVariant || isAdding}
            size="lg"
            // isLoading={isAdding}
          >
            Add to cart
          </Button>
        </div>
      </div>{" "}
      <p className="pt-4 text-xs md:text-base font-normal text-Grays-Gray-500">
        Estimate delivery 2–3 days
      </p>
    </>
  )
}
