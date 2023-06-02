"use client";

import Sidebar from '@/components/sidebar'
import '../globals.css'
import AuthProvider from '@/components/common/auth_provider'
import { SnackbarProvider } from 'notistack'

export default function AuthenticatedRootLayout({ children, }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <SnackbarProvider >
          <AuthProvider>
            <div className="flex">
              <Sidebar />
              <div className="w-full m-10">
                {children}
              </div>
            </div>
          </AuthProvider>
        </SnackbarProvider>
      </body>
    </html>
  )
}