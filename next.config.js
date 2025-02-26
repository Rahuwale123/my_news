/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**', // Allow all domains for now
      }
    ],
  },
  output: 'standalone', // Add this for Netlify deployment
  trailingSlash: true, // Add this
}

module.exports = nextConfig 