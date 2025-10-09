import { routes } from "@lib/routes"
import Navbar from "components/Navbar"
import RightIcons from "components/RightIcons/RightIcons"
import Link from "next/link"
import React from "react"

const Header = () => {
  return (
    <header className="flex flex-row justify-between items-center w-full md:h-[84px] h-[72px] px-8 md:px-24 bg-transparent">
      <Link
        href={routes.home}
        className="font-sans font-medium text-2xl leading-[0.9] tracking-normal text-B&W-Black"
      >
        SofaSocietyCo.
      </Link>
      <Navbar />
      <RightIcons />
    </header>
  )
}

export default Header
