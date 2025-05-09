// next.config.js
/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return [
      {
        source: '/privacy-policy.html',
        destination: '/privacy-policy',
        permanent: true,   // sends a 301 status
      },
    ]
  },
}

module.exports = nextConfig
