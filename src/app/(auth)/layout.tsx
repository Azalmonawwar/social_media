import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import '../globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'MetaGram',
  description: 'MetaGram is a social media platform for sharing photos and videos with friends and family by azal monawwar. ',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} h-screen`}>
      <section className="flex flex-col items-center justify-start sm:justify-center   py-[10px] sm:py-24">
        {children}
      </section>
      <footer className="flex justify-center py-4">
        <p className="text-sm">&copy; 2023 MetaGram By Azal Monawwar</p>
      </footer>
        </body>
    </html>
  )
}