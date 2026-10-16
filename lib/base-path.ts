/**
 * Prefijo de ruta del sitio. Vacío en desarrollo y en `pnpm build && pnpm start` local;
 * solo toma el nombre del repo cuando el build es para GitHub Pages (ver next.config.mjs
 * y .github/workflows/deploy-pages.yml), porque un repo Pages que no es el de usuario
 * (`<usuario>.github.io`) se sirve bajo `/<repo>/`, no en la raíz del dominio.
 */
export const BASE_PATH = process.env.NEXT_PUBLIC_BASE_PATH ?? "";
