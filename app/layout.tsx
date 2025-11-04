import "@/app/globals.css"
import { Inter } from "next/font/google"
import localFont from "next/font/local";
import type React from "react"

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
})

const jetBrains = localFont({
  src: "./fonts/JetBrainsMono-Regular.ttf",
});

export const metadata = {
  title: "Vincent Raimondi - Software Developer",
  description: "Software Developer based in San Diego",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={inter.variable}>
      <body className={`${jetBrains.className} antialiased`}>{children}</body>
    </html>
  )
}
