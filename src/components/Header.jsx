// components/Header.jsx
'use client';

import Link from 'next/link';
import { useSession, signIn, signOut } from 'next-auth/react';

export default function Header() {
  const { data: session, status } = useSession();

  return (
    <header className="header-container">
      <Link href="/" className="logo">ExecAndMe</Link>

      <nav className="nav-links">
        <Link href="/">Home</Link>
        <Link href="/browse">Browse</Link>
        <Link href="/how-it-works">How It Works</Link>
        {status === 'authenticated' && (
          <Link href="/dashboard">My Profile</Link>
        )}
      </nav>

      <div>
        {status === 'loading' ? null : session ? (
          <button
            onClick={() => signOut()}
            className="btn-secondary"
          >
            Sign out
          </button>
        ) : (
          <button
            onClick={() => signIn('linkedin')}
            className="btn-primary"
          >
            Sign in with LinkedIn
          </button>
        )}
      </div>
    </header>
  );
}
