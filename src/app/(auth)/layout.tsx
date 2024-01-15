import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import '../globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'MetaGram',
  description: 'MetaGram is a social media platform for sharing photos and videos with friends and family.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
      <section className="flex flex-col items-center justify-start sm:justify-center  h-screen py-[10px] sm:py-24">
        {children}
      </section>
        </body>
    </html>
  )
}