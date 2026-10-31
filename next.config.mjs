/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    unoptimized: true,
  },
  // Las URLs del sitio anterior siguen funcionando.
  async redirects() {
    return [
      { source: '/catalogo', destination: '/motos', permanent: true },
      { source: '/catalogo/:slug', destination: '/motos/:slug', permanent: true },
      { source: '/servicios', destination: '/financiacion', permanent: true },
      { source: '/vende-tu-auto', destination: '/vende-tu-moto', permanent: true },
    ]
  },
}

export default nextConfig
