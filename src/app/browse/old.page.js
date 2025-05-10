// src/app/browse/page.js
'use client'

import Image from 'next/image'
import Link from 'next/link'

const executives = [
  { img: '/images/executive3.JPG',  label: 'Top Booked',    name: 'Michael Reeves' },
  { img: '/images/executive10.JPG', label: 'New & Trending', name: 'Vanessa Lee'    },
  { img: '/images/executive1.jpg',  label: 'Fast Response',  name: 'Chris Knight'   },
  { img: '/images/executive2.JPG',  label: 'Top Rated',      name: 'Emma Brooks'    },
]

export default function Browse() {
  return (
    <main className="section">
      <h2>Browse Executives</h2>
      <div className="featured-grid">
        {executives.map(({ img, label, name }) => (
          <div key={name} className="exec-card">
            <Image
              src={img}
              alt={name}
              width={400}
              height={300}
              className="exec-img"
            />
            <h4>{label}</h4>
            <p>{name}</p>
            <Link href="/executive-profile">
              <button className="btn-featured">View Profile</button>
            </Link>
          </div>
        ))}
      </div>
    </main>
  )
}
