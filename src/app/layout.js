// src/app/layout.js
import './globals.css';
import { SessionProvider } from 'next-auth/react';       // ← add this
import Header from '../components/Header';

export const metadata = {
  title: 'ExecAndMe | On-Demand Executive Insights',
  description:
    'Instant access to C-level insight, strategy calls, and mentorship from industry leaders.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <SessionProvider>                                {/* ← wrap */}
          <Header />
          {children}
        </SessionProvider>                               {/* ← wrap */}
      </body>
    </html>
  );
}
