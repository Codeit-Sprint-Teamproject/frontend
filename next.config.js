/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: [
      'dev-codeit-4.s3.ap-northeast-2.amazonaws.com',
      'image.yes24.com',
    ],
  },
};

module.exports = nextConfig;
