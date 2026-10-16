// GITHUB_PAGES solo se define en el workflow de despliegue (.github/workflows/deploy-pages.yml).
// En desarrollo y en `pnpm build && pnpm start` locales queda sin definir, así que el sitio
// se sigue sirviendo en la raíz exactamente como antes.
const GITHUB_PAGES = process.env.GITHUB_PAGES === 'true'
const REPO_NAME = 'ModeloOSI_TCP'
const BASE_PATH = GITHUB_PAGES ? `/${REPO_NAME}` : ''

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
  ...(GITHUB_PAGES && {
    output: 'export',
    basePath: BASE_PATH,
    assetPrefix: `${BASE_PATH}/`,
  }),
  env: {
    NEXT_PUBLIC_BASE_PATH: BASE_PATH,
  },
}

export default nextConfig
