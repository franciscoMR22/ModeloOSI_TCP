/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
  // Quita el indicador flotante de desarrollo (la "N" de abajo a la izquierda con
  // info de ruta, bundler y preferencias). Solo existe con `next dev`, nunca en producción.
  devIndicators: false,
}

export default nextConfig
