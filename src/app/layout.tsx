import { getBaseURL } from "@lib/util/env"
import { Metadata } from "next"
import "styles/globals.css"

import { Mona_Sans } from "next/font/google"
import { Toaster } from "@medusajs/ui"

const monaSans = Mona_Sans({
  subsets: ["latin"],
  variable: "--font-mona-sans",
  display: "swap",
  weight: ["400", "500", "600", "700"],
})

export const metadata: Metadata = {
  metadataBase: new URL(getBaseURL()),
}

export default function RootLayout(props: { children: React.ReactNode }) {
  return (
    <html lang="en" data-mode="light" className={monaSans.variable}>
      <body>
        <main className="relative">{props.children}</main>
        <Toaster />
      </body>
    </html>
  )
}
