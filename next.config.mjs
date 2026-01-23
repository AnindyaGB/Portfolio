/** @type {import('next').NextConfig} */
const nextConfig = {
  /* config options here */
    images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cdn.weatherapi.com',
        port: '',
        pathname: '/**', // This allows all paths on the domain
      },
    ],
  },
};

export default nextConfig;
