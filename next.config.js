/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // basePath: '/test/sample'
  images: {
    // url: https://nextjs.org/docs/messages/next-image-unconfigured-host
    domains: ['images.microcms-assets.io'],
  },
}

module.exports = nextConfig
