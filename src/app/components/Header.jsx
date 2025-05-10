'use client'
import Link from 'next/link'

export default function Header() {
  return (
    <header className="header-container">
      <div className="nav-left">
        <Link href="/" className="logo">
          ExecAndMe
        </Link>

        <nav className="nav-links">
          <Link href="/executives">Browse Executives</Link>
          <Link href="/how-it-works">How It Works</Link>
          <Link href="/become-an-exec">Become an Exec</Link>
          <Link href="/contact">Contact</Link>
          <Link href="/faq">FAQ</Link>
        </nav>
      </div>

      <div className="nav-center">
        <input type="search" placeholder="Search Execs..." className="header-search" />
      </div>

      <div className="nav-right">
        <button className="btn-text">Log in</button>
        <button className="btn-signup">Sign Up</button>
      </div>
    </header>
  )
}
