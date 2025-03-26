import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'User Profile',
  description: 'OneKyc',
  generator: 'OneKyc',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <div className="profile-layout">
      <main>{children}</main>
    </div>
  );
}
