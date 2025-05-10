// src/app/layout.js
import "./globals.css";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Providers from "./components/Providers";

export const metadata = {
  title: "ExecAndMe | On-Demand Executive Insights",
  description:
    "Instant access to C-level insight, strategy calls, and mentorship from industry leaders.",
};

export default function RootLayout({ children, session }) {
  return (
    <html lang="en">
      <body>
        <Providers session={session}>
          <Header />
          <main className="main-container">
            {children}
          </main>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
