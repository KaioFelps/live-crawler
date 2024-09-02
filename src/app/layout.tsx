import "dotenv/config"
import 'bootstrap/dist/css/bootstrap.min.css';
import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { BootstrapSSR } from '@/libs/BootstrapSSR';
import coverImage from "@/../public/cover.png";

const inter = Inter({ subsets: ['latin'] })

const appURL: string = process.env.SITE_URL!
const title = 'Habblive Promoções'
const description = 'Um site um pouco menos feio para visualizar as promoções ativas do Habblive Hotel! #ForaAfter'
const cover = `${appURL}/${coverImage.src}`

export const metadata: Metadata = {
  metadataBase: new URL(appURL),
  title,
  description,
  openGraph: {
    title,
    description,
    type: "website",
    url: appURL,
    images: cover,
    siteName: title,
    locale: "pt_BR",
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
    images: [cover],
  },
  alternates: {
    canonical: "/",
  },
  applicationName: title,
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt-Br">
      <head>
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css"
          integrity="sha384-9ndCyUaIbzAi2FUVXJi0CjmCapSmO7SnpJef0486qhLnuZ2cdeRhO02iuK6FUUVM"
          crossOrigin="anonymous"
        />
      </head>
      <body className={inter.className}>
        <BootstrapSSR>
          {children}
        </BootstrapSSR>
      </body>
    </html>
  )
}
