'use client'

import Head from 'next/head'
import { useState } from 'react'

export default function BecomeAnExecPage() {
  const [rateModel, setRateModel] = useState('15min')
  const [rate15, setRate15]       = useState('')
  const [rateHour, setRateHour]   = useState('')

  function handleSubmit(e) {
    e.preventDefault()
    console.log({ rateModel, rate15, rateHour })
    alert(
      'Submitted: ' +
      (rateModel === '15min'
        ? `$${rate15} per 15 min`
        : `$${rateHour} per hour`
      )
    )
  }

  return (
    <>
      <Head>
        <title>Become an Executive – ExecAndMe</title>
        <meta
          name="description"
          content="Sign up as an Executive set your availability and rates"
        />
      </Head>

      <main className="main-container">
        <h1>Become an Executive</h1>

        <form onSubmit={handleSubmit} className="invite-form">
          <div style={{ marginBottom: '1rem' }}>
            <label>
              <input
                type="radio"
                name="rateModel"
                value="15min"
                checked={rateModel === '15min'}
                onChange={() => setRateModel('15min')}
              />{' '}
              Per 15-minute session
            </label>

            {rateModel === '15min' && (
              <input
                type="number"
                placeholder="Price for 15 min (USD)"
                value={rate15}
                onChange={e => setRate15(e.target.value)}
                required
                style={{
                  display: 'block',
                  marginTop: '0.5rem',
                  width: '200px'
                }}
              />
            )}
          </div>

          <div style={{ marginBottom: '1rem' }}>
            <label>
              <input
                type="radio"
                name="rateModel"
                value="hour"
                checked={rateModel === 'hour'}
                onChange={() => setRateModel('hour')}
              />{' '}
              Flat rate for 60 minutes
            </label>

            {rateModel === 'hour' && (
              <input
                type="number"
                placeholder="Price for 60 min (USD)"
                value={rateHour}
                onChange={e => setRateHour(e.target.value)}
                required
                style={{
                  display: 'block',
                  marginTop: '0.5rem',
                  width: '200px'
                }}
              />
            )}
          </div>

          <button type="submit" className="btn-signup">
            Submit
          </button>
        </form>
      </main>
    </>
  )
}
