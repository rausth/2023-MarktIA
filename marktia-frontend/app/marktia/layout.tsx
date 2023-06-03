import Sidebar from '@/components/sidebar'
import '../globals.css'
import AuthProvider from '@/components/common/auth_provider'

export default function AuthenticatedRootLayout({ children, }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
          <AuthProvider>
            <div className="flex">
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