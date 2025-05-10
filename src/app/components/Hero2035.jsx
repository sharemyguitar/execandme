'use client'

export default function Hero2035() {
  return (
    <section className="hero-2035">
      <div className="hero-overlay">
        <h1>Your On-Demand Executive Network—Powered by AI</h1>
        <form className="hero-search" onSubmit={e => e.preventDefault()}>
          <input type="text" placeholder="What expertise do you need?" />
          <button type="button" aria-label="Voice search">🎙️</button>
        </form>
        <ul className="hero-tags">
          <li>C-Suite</li>
          <li>Digital Transformation</li>
          <li>ESG Insights</li>
          <li>Growth Strategy</li>
        </ul>
      </div>
    </section>
  )
}
