/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  basePath: '/colmedicos-ui',
  trailingSlash: true,
  images: {
    unoptimized: true
  }
};

export default nextConfig;
