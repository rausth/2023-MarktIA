import Sidebar from '@/components/sidebar'
import '../globals.css'
import { AuthProvider } from '@/contexts/AuthContext'

export default function AuthenticatedRootLayout({ children, }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <title>MarktIA</title>
        <link rel="icon" href="/images/favicon.ico" />
      </head>
      <body>
        <AuthProvider>
          <div className="flex bg-white-dark">
            <Sidebar />
            <div className="w-full m-10">
              {children}
            </div>
          </div>
        </AuthProvider>
      </body>
    </html>
  )
}