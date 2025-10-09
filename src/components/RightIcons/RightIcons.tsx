import SearchIcon from "components/Icons/SearchIcon"
import ChevronDown from "components/Icons/ChevronDown"
import { routes } from "@lib/routes"
import Link from "next/link"
import CartIcon from "components/Icons/CartIcon"
import BurgerIcon from "components/Icons/BurgerIcon"

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
