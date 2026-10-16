import type { Metadata } from 'next'
import { Inter, JetBrains_Mono } from 'next/font/google'
import { ThemeProvider } from '@/components/theme-provider'
import { BASE_PATH } from '@/lib/base-path'
import './globals.css'

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const jetbrainsMono = JetBrains_Mono({ subsets: ["latin"], variable: "--font-jetbrains" });

export const metadata: Metadata = {
  title: 'OSI vs TCP/IP — Interactive Network Model Deep Dive',
  description: 'An interactive technical comparison of the OSI Model (ISO/IEC 7498-1) and the TCP/IP Model (RFC 1122). Explore encapsulation, protocols, and PDUs layer by layer.',
  icons: {
    icon: `${BASE_PATH}/icon.png`,
    apple: `${BASE_PATH}/apple-icon.png`,
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="es" suppressHydrationWarning>
      <head>
        {/* Rutas de fondo con el prefijo correcto (vacío en local, /ModeloOSI_TCP en GitHub
            Pages): globals.css no puede leer process.env, así que se resuelven aquí una sola
            vez y el CSS solo referencia estas variables. */}
        <style>{`:root{--bg-glass-crackle:url(${BASE_PATH}/glass-crackle.svg);--bg-courier-light:url(${BASE_PATH}/obsidian-courier-light.jpg);--bg-courier-dark:url(${BASE_PATH}/obsidian-courier-dark.jpg);}`}</style>
      </head>
      <body className={`${inter.variable} ${jetbrainsMono.variable} font-sans antialiased`}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange={false}>
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}
