"use client";

import { SnackbarProvider } from 'notistack'
import '../globals.css'
import Image from 'next/image'

export default function PublicRootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <title>MarktIA</title>
        <link rel="icon" href="/images/favicon.ico" />
      </head>
      <body>
        <div className="h-screen flex flex-col justify-center bg-white-dark">
          <div className="flex justify-center">
            <Image src="/marca_aprovada.png" className="w-1/4" alt="logo" />
          </div>

          <div className="flex justify-center mt-2">
            <div className="w-1/2 px-10 py-5 rounded-lg">
              <SnackbarProvider>
                {children}
              </SnackbarProvider>
            </div>
          </div>
        </div>
      </body>
    </html>
  )
}