import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import '../globals.css'
import TopBar from '@/components/shared/Topbar'
import Leftbar from '@/components/shared/Leftbar'
import Bottombar from '@/components/shared/Bottombar'
import NextTopLoader from 'nextjs-toploader'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Metagram',
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
      <NextTopLoader
        height={2}
      color='#ffffff'
      showSpinner={false}
      />
        <TopBar/>
        <Leftbar/>
        {children}
        
        <Bottombar/>
        </body>
    </html>
  )
}
