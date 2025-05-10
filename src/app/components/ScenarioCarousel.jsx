'use client'

const SCENARIOS = [
  { icon: '/icons/fundraising.svg', label: 'Fundraising Strategy' },
  { icon: '/icons/mergers.svg',        label: 'M&A Negotiations' },
  { icon: '/icons/global.svg',         label: 'Global Expansion' },
]

export default function ScenarioCarousel() {
  return (
    <section className="scenarios-2035">
      <h2>Browse by Scenario</h2>
      <div className="scenario-carousel">
        {SCENARIOS.map((s, i) => (
          <div key={i} className="scenario-card">
            <img src={s.icon} alt="" />
            <p>{s.label}</p>
          </div>
        ))}
      </div>
    </section>
  )
}
