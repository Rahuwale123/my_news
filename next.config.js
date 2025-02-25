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
  output: 'export', // Add this for static export
}

module.exports = nextConfig 