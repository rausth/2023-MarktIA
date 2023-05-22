import '../globals.css'

export default function PublicRootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <div className="h-screen flex justify-center items-center">
          <div className="w-1/2 px-10 py-5 rounded-lg">
            <h1 className="text-center text-2xl mb-5">MarktIA</h1>
            {children}
          </div>
        </div>
      </body>
    </html>
  )
}