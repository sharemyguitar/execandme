"use client";

import Image from "next/image";
import Link from "next/link";
import InviteExec from "./components/InviteExec";

export default function HomePage() {
  return (
    <main className="main-container">
      {/* ─── Hero ─────────────────────────────────────────── */}
      <section className="hero">
        <div className="hero-inner">
          <h1>On-Demand Executive Sessions</h1>
          <p>
            Instant access to C-level insight, strategy calls, and mentorship
            from industry leaders.
          </p>
          <div className="hero-buttons">
            <Link href="/browse">
              <button className="btn btn-primary">Browse Executives</button>
            </Link>
            <Link href="/how-it-works">
              <button className="btn btn-secondary">
                Learn How It Works
              </button>
            </Link>
          </div>
        </div>
      </section>

      {/* ─── Invite an Exec ──────────────────────────────── */}
      <InviteExec />

      {/* ─── Shop by Category ─────────────────────────────── */}
      <section className="section">
        <h2>Shop by Category</h2>
        <div className="categories-section">
          {[
            ["executive1.jpg", "C-Suite"],
            ["executive2.JPG", "Finance"],
            ["executive3.JPG", "Product"],
            ["executive4.JPG", "Marketing"],
            ["executive5.JPG", "Legal"],
            ["executive6.JPG", "Ops"],
            ["executive7.JPG", "Tech"],
            ["executive8.JPG", "More"],
          ].map(([src, label]) => (
            <a key={label} className="category-item" href="#">
              <Image
                src={`/images/${src}`}
                alt={label}
                width={100}
                height={100}
              />
              <span>{label}</span>
            </a>
          ))}
        </div>
      </section>

      {/* ─── Featured Executives ──────────────────────────── */}
      <section className="section">
        <h2>Featured Executives</h2>
        <div className="featured-grid">
          {[
            ["/images/executive3.JPG", "Top Booked", "Michael Reeves"],
            ["/images/executive10.JPG", "New & Trending", "Vanessa Lee"],
            ["/images/executive1.jpg", "Fast Response", "Chris Knight"],
            ["/images/executive2.JPG", "Top Rated", "Emma Brooks"],
          ].map(([src, tag, name]) => (
            <div key={name} className="exec-card">
              <Image src={src} alt={name} width={400} height={300} />
              <div className="exec-card-content">
                <h4>{tag}</h4>
                <p>{name}</p>
                <Link href="/executive-profile">
                  <button className="btn-featured">View Profile</button>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ─── Testimonials ──────────────────────────────────── */}
      <section className="testimonials">
        <h2>What Account Managers Are Saying</h2>
        <div className="testimonials-grid">
          {[
            [
              "account-manager-blond-male-33.jpg",
              "“I booked a 30-minute CFO session in minutes—something I couldn’t get on my own. Totally game changing!”",
              "—James, Account Manager",
            ],
            [
              "account-manager-asian-female-25.jpg",
              "“Before ExecAndMe, I was stalled on strategy calls. Now I’ve closed three big deals with C-suite insights!”",
              "—Emily, Marketing Manager",
            ],
            [
              "account-manager-africanamerican-male-55.jpg",
              "“As a veteran seller, I’ve never seen such fast access to real executives. It’s turbocharged my pipeline.”",
              "—Robert, Senior Account Manager",
            ],
          ].map(([src, quote, attr]) => (
            <div key={attr} className="testimonial-card">
              <Image
                src={`/images/${src}`}
                alt=""
                width={80}
                height={80}
              />
              <p className="quote">{quote}</p>
              <p className="attribution">{attr}</p>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}

