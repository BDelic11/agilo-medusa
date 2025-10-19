import { Button } from "components/_ui/button"
import Link from "next/link"

const TARGET_PRODUCT_HANDLE = "paloma-haven"
const DEFAULT_COUNTRY = "hr"

const Hero = () => {
  return (
    <div className=" w-full min-h-[90vh] flex items-center">
      <div className=" mx-auto max-w-[1100px] px-6 py-16 md:py-24 flex flex-col items-center text-center gap-6">
        <div className="flex flex-col gap-2">
          <h1 className="font-semibold text-2xl md:text-[40px] text-B&W-Black leading-[140%]">
            Zadatak za projekt Agilo
          </h1>
          <h2 className="text-xl md:text-2xl leading-snug text-Grays-Gray-500 font-normal">
            Next.js + TypeScript + Tailwind, integrirano s Medusa JS SDK-om
          </h2>
        </div>

        <div className="flex flex-col sm:flex-row items-center gap-3 mt-20">
          <Link href={`/${DEFAULT_COUNTRY}/products/${TARGET_PRODUCT_HANDLE}`}>
            <Button size="lg">Nastavi na Product stranicu</Button>
          </Link>
        </div>
        <div className="mt-6 text-xs md:text-sm text-ui-fg-muted">
          Projekt za tvrtku <b className="text-B&W-Black">Agilo</b>
        </div>
      </div>
    </div>
  )
}

export default Hero
