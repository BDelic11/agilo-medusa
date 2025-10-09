import Link from "next/link"
import React from "react"

const navbarItems = [
  { label: "About", href: "/about" },
  { label: "Inspiration", href: "/inspiration" },
  { label: "Shop", href: "/shop" },
]

const Navbar = () => {
  return (
    <nav className="hidden md:flex flex-row justify-center gap-8">
      {navbarItems.map((item) => (
        <Link
          key={item.href}
          href={item.href}
          className=" font-normal text-base leading-relaxed text-B&W-Black transition-colors duration-300 hover:text-gray-500"
        >
          {item.label}
        </Link>
      ))}
    </nav>
  )
}

export default Navbar
