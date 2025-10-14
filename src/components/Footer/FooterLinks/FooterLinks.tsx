import Link from "next/link"

const footerColumns = [
  {
    title: "Support",
    links: [
      { name: "FAQ", href: "/faq" },
      { name: "Help", href: "/help" },
      { name: "Delivery", href: "/delivery" },
      { name: "Returns", href: "/returns" },
    ],
  },
  {
    title: "Social",
    links: [
      { name: "Instagram", href: "https://instagram.com" },
      { name: "TikTok", href: "https://tiktok.com" },
      { name: "Pinterest", href: "https://pinterest.com" },
      { name: "Facebook", href: "https://facebook.com" },
    ],
  },
  {
    title: "Legal",
    links: [
      { name: "Privacy Policy", href: "/privacy" },
      { name: "Cookie Policy", href: "/cookie" },
      { name: "Terms of Use", href: "/terms" },
    ],
  },
]

export default function FooterLinks() {
  return (
    <section className="flex flex-wrap justify-between w-full md:gap-[72px] md:text-base text-xs gap-y-6 md:gap-y-4">
      {footerColumns.map((column) => (
        <ul
          key={column.title}
          className="flex flex-col gap-[24px] md:gap-[16px] w-max"
        >
          {column.links.map((link) => (
            <li key={link.name}>
              <Link
                href={link.href}
                className="text-gray-600 hover:text-B&W-Black transition-colors duration-300"
              >
                {link.name}
              </Link>
            </li>
          ))}
        </ul>
      ))}
    </section>
  )
}
