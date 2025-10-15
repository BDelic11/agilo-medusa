import Link from "next/link"
import React from "react"

const navbarItems = [
  { label: "About", href: "/about" },
  { label: "Inspiration", href: "/inspiration" },
  { label: "Shop", href: "/shop" },
]

const Navbar = () => {
  return (
    <nav aria-label="Main navigation" className="hidden md:flex justify-center">
      <ul className="flex flex-row gap-8 list-none">
        {navbarItems.map((item) => (
          <li key={item.href}>
            <Link
              href={item.href}
              className="font-normal text-base leading-relaxed text-B&W-Black transition-colors duration-300 hover:text-gray-500"
            >
              {item.label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  )
}

export default Navbar
