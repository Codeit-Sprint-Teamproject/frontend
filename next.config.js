/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'image.yes24.com',
        pathname: '**',
      },
    ],
  },
};

module.exports = nextConfig;
