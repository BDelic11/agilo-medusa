import { getBaseURL } from "@lib/util/env"
import Footer from "components/Footer"
import Header from "components/Header"
import { Metadata } from "next"
import "styles/globals.css"

export const metadata: Metadata = {
  metadataBase: new URL(getBaseURL()),
}

export default function RootLayout(props: { children: React.ReactNode }) {
  return (
    <html lang="en" data-mode="light">
      <body>
        <Header />
        <main className="relative">{props.children}</main>
        <Footer />
      </body>
    </html>
  )
}
