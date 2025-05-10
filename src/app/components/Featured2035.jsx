'use client'

const FEATURED = [
  '/execs/reeves.jpg',
  '/execs/vanessa.jpg',
  '/execs/chris.jpg',
  '/execs/emma.jpg',
]

export default function Featured2035() {
  return (
    <section className="featured-2035">
      <h2>Featured Execs</h2>
      <div className="featured-grid-2035">
        {FEATURED.map((src, i) => (
          <div key={i} className="exec-card-2035">
            <img src={src} alt={`Featured exec ${i+1}`} />
          </div>
        ))}
      </div>
    </section>
  )
}
