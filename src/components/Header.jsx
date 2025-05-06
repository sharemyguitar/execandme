// src/components/Header.jsx
'use client'

import { useEffect, useState } from 'react'

export default function Header() {
  const [html, setHtml] = useState('')

  useEffect(() => {
    fetch('/header.html')
      .then(res => res.text())
      .then(setHtml)
      .catch(console.error)
  }, [])

  return (
    <header
      dangerouslySetInnerHTML={{ __html: html }}
    />
  )
}
