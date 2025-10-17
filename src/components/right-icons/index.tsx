import SearchIcon from "components/icons/search"
import ChevronDown from "components/icons/chevron-down"
import { routes } from "@lib/routes"
import Link from "next/link"
import CartIcon from "components/icons/cart"
import BurgerIcon from "components/icons/burger"
import { getCartQuantity } from "@lib/data/cart"

const RightIcons = async () => {
  const cartQuantity = await getCartQuantity()

  return (
    <div className="flex flex-row w-min items-center gap-8">
      <div className="hidden md:flex flex-row w-min items-center">
        <p className="w-min text-base">HR</p>
        <ChevronDown />
      </div>
      <div className="hidden md:block">
        <SearchIcon />
      </div>

      <Link href={routes.cart} className="relative">
        <CartIcon />
        {cartQuantity > 0 && (
          <span
            className="
            absolute -top-2 -right-2 h-5 w-5 px-1
            rounded-full bg-Error-Red text-white text-xs leading-5
            text-center font-normal
          "
          >
            {cartQuantity}
          </span>
        )}
      </Link>
      <div className="md:hidden block">
        <BurgerIcon />
      </div>
    </div>
  )
}

export default RightIcons
