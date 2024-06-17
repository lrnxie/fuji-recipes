/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'www.notion.so',
        port: '',
        pathname: '/image/**',
      },
      {
        protocol: 'https',
        hostname: 'images.squarespace-cdn.com',
        port: '',
        pathname: '/content/**',
      },
      {
        protocol: 'https',
        hostname: 'fujixweekly.files.wordpress.com',
        port: '',
        pathname: '**',
      },
      {
        protocol: 'https',
        hostname: 'i0.wp.com',
        port: '',
        pathname: '/fujixweekly.com/wp-content/uploads/**',
      },
    ],
  },
};

export default nextConfig;
