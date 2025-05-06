// src/app/layout.js
import './globals.css';
import Header from '../components/Header'

export const metadata = {
  title: 'ExecAndMe | On-Demand Executive Insights',
  description:
    'Instant access to C-level insight, strategy calls, and mentorship from industry leaders.',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        {/* client-side header */}
        <Header />
        {children}
      </body>
    </html>
  )
}
