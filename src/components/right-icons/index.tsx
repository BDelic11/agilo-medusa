import SearchIcon from "components/icons/search"
import ChevronDown from "components/icons/chevron-down"
import { routes } from "@lib/routes"
import Link from "next/link"
import CartIcon from "components/icons/cart"
import BurgerIcon from "components/icons/burger"

const RightIcons = () => {
  return (
    <div className="flex flex-row w-min items-center gap-8">
      <div className="hidden md:flex flex-row w-min items-center">
        <p className="w-min text-base">HR</p>
        <ChevronDown />
      </div>
      <div className="hidden md:block">
        <SearchIcon />
      </div>
      <Link href={routes.cart}>
        <CartIcon />
      </Link>
      <div className="md:hidden block">
        <BurgerIcon />
      </div>
    </div>
  )
}

export default RightIcons
