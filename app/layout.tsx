import type React from "react"
import type { Metadata } from "next"
import { GeistSans } from "geist/font/sans"
import { Analytics } from "@vercel/analytics/next"
import "./globals.css"
import { Playfair_Display } from "next/font/google"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { IntroOverlay } from "@/components/intro-overlay"
import { Suspense } from "react"
import { AIChatbot } from "@/components/ai-chatbot"

const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "600", "700"],
  display: "swap",
  variable: "--font-heading",
})

export const metadata: Metadata = {
  title: "Kinn",
  description: "Probate Services",
  generator: "",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${GeistSans.variable} ${playfair.variable} antialiased`}>
      <body className="font-sans">
        <Suspense fallback={<div>Loading...</div>}>
          <IntroOverlay />
          <SiteHeader />
          {children}
          <SiteFooter />
        </Suspense>
        <AIChatbot />
        <Analytics />
      </body>
    </html>
  )
}
