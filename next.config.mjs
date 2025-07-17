/** @type {import('next').NextConfig} */
const nextConfig = {
  // Solo usar export en producción
  ...(process.env.NODE_ENV === 'production' && {
    output: 'export',
    basePath: '/colmedicos-ui',
    trailingSlash: true,
    images: {
      unoptimized: true
    }
  }),
  // Configuración para desarrollo
  ...(process.env.NODE_ENV === 'development' && {
    images: {
      unoptimized: true
    }
  })
};

export default nextConfig;
