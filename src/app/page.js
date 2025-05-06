// src/app/page.js

import Image from 'next/image'
import Link from 'next/link'

export default function Home() {
  return (
    <main>
      {/* ─── Hero ─────────────────────────────────────────── */}
      <section className="hero">
        <div className="hero-inner">
          <h1>On-Demand Executive Sessions</h1>
          <p>Instant access to C-level insight, strategy calls, and mentorship from industry leaders.</p>
          <div className="hero-buttons">
            <Link href="/browse">
              <button className="btn btn-primary">Browse Executives</button>
            </Link>
            <Link href="/how-it-works">
              <button className="btn btn-secondary">Learn How It Works</button>
            </Link>
          </div>
        </div>
      </section>

      {/* ─── Shop by Category ─────────────────────────────── */}
      <section className="section">
        <h2>Shop by Category</h2>
        <div className="categories-section">
          <a className="category-item" href="#">
            <Image src="/images/executive1.jpg" alt="C-Suite" width={100} height={100} />
            <span>C-Suite</span>
          </a>
          <a className="category-item" href="#">
            <Image src="/images/executive2.JPG" alt="Finance" width={100} height={100} />
            <span>Finance</span>
          </a>
          <a className="category-item" href="#">
            <Image src="/images/executive3.JPG" alt="Product" width={100} height={100} />
            <span>Product</span>
          </a>
          <a className="category-item" href="#">
            <Image src="/images/executive4.JPG" alt="Marketing" width={100} height={100} />
            <span>Marketing</span>
          </a>
          <a className="category-item" href="#">
            <Image src="/images/executive5.JPG" alt="Legal" width={100} height={100} />
            <span>Legal</span>
          </a>
          <a className="category-item" href="#">
            <Image src="/images/executive6.JPG" alt="Ops" width={100} height={100} />
            <span>Ops</span>
          </a>
          <a className="category-item" href="#">
            <Image src="/images/executive7.JPG" alt="Tech" width={100} height={100} />
            <span>Tech</span>
          </a>
          <a className="category-item" href="#">
            <Image src="/images/executive8.JPG" alt="More" width={100} height={100} />
            <span>More</span>
          </a>
        </div>
      </section>

      {/* ─── Featured Executives ──────────────────────────── */}
      <section className="section">
        <h2>Featured Executives</h2>
        <div className="featured-grid">
          <div className="exec-card">
            <Image
              src="/images/executive3.JPG"
              alt="Michael Reeves"
              width={400}
              height={300}
              className="exec-img"
            />
            <h4>Top Booked</h4>
            <p>Michael Reeves</p>
            <Link href="/executive-profile">
              <button className="btn-featured">View Profile</button>
            </Link>
          </div>
          <div className="exec-card">
            <Image
              src="/images/executive10.JPG"
              alt="Vanessa Lee"
              width={400}
              height={300}
              className="exec-img"
            />
            <h4>New & Trending</h4>
            <p>Vanessa Lee</p>
            <Link href="/executive-profile">
              <button className="btn-featured">View Profile</button>
            </Link>
          </div>
          <div className="exec-card">
            <Image
              src="/images/executive1.jpg"
              alt="Chris Knight"
              width={400}
              height={300}
              className="exec-img"
            />
            <h4>Fast Response</h4>
            <p>Chris Knight</p>
            <Link href="/executive-profile">
              <button className="btn-featured">View Profile</button>
            </Link>
          </div>
          <div className="exec-card">
            <Image
              src="/images/executive2.JPG"
              alt="Emma Brooks"
              width={400}
              height={300}
              className="exec-img"
            />
            <h4>Top Rated</h4>
            <p>Emma Brooks</p>
            <Link href="/executive-profile">
              <button className="btn-featured">View Profile</button>
            </Link>
          </div>
        </div>
      </section>

      {/* ─── Testimonials ──────────────────────────────────── */}
      <section className="testimonials">
        <h2>What Account Managers Are Saying</h2>
        <div className="testimonials-grid">
          <div className="testimonial-card">
            <Image
              src="/images/account-manager-blond-male-33.jpg"
              alt="James (Account Manager, 33)"
              width={80}
              height={80}
            />
            <p className="quote">
              “I booked a 30-minute CFO session in minutes—something I couldn’t get on my own. Totally game changing!”
            </p>
            <p className="attribution">—James, Account Manager</p>
          </div>
          <div className="testimonial-card">
            <Image
              src="/images/account-manager-asian-female-25.jpg"
              alt="Emily (Account Manager, 25)"
              width={80}
              height={80}
            />
            <p className="quote">
              “Before ExecAndMe, I was stalled on strategy calls. Now I’ve closed three big deals with C-suite insights!”
            </p>
            <p className="attribution">—Emily, Marketing Manager</p>
          </div>
          <div className="testimonial-card">
            <Image
              src="/images/account-manager-africanamerican-male-55.jpg"
              alt="Robert (Account Manager, 55)"
              width={80}
              height={80}
            />
            <p className="quote">
              “As a veteran seller, I’ve never seen such fast access to real executives. It’s turbocharged my pipeline.”
            </p>
            <p className="attribution">—Robert, Senior Account Manager</p>
          </div>
        </div>
      </section>
    </main>
  )
}
