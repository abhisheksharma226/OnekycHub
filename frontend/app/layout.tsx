import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Onekyc Hub',
  description: 'Onekyc Hub is a KYC verification platform for businesses and individuals.',
  generator: 'Onekyc Hub',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
