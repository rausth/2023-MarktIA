import Sidebar from '@/components/sidebar'
import '../globals.css'

export default function RootLayout({
  children,
} : {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <div className="flex">
          <Sidebar />
          <div className="w-full p-10">
            {children}
          </div>
        </div>
      </body>
    </html>
  )
}