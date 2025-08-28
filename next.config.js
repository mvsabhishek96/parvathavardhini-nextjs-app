// next.config.js (create this in the root directory)
/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
  },
  images: {
    domains: [],
    unoptimized: process.env.NODE_ENV === 'development', // Optional: for local development
  },
}

module.exports = nextConfig