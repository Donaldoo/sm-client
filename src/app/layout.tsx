import type { Metadata } from 'next'

import './globals.css'
import Navbar from '@/components/Navbar'
import Provider from '@/utils/Providers'

export const metadata: Metadata = {
  title: 'UniLink',
  description: 'Social media for students',
  icons: [{ rel: 'icon', url: '/2.png' }]
}

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang='en'>
      <body>
        <main>
          <Provider>
            <Navbar />
            {children}
          </Provider>
        </main>
      </body>
    </html>
  )
}
