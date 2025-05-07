// src/app/layout.js
import "./globals.css"
import Header from "../components/Header"
import Providers from "../components/Providers"

export const metadata = {
  title: "ExecAndMe | On-Demand Executive Insights",
  description:
    "Instant access to C-level insight, strategy calls, and mentorship from industry leaders.",
}

export default function RootLayout({ children, session }) {
  return (
    <html lang="en">
      <body>
        <Providers session={session}>
          <Header />
          {children}
        </Providers>
      </body>
    </html>
  )
}
