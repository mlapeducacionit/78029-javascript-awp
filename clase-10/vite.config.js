import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    VitePWA(
      { 
        registerType: 'autoUpdate',
        workbox: {
          runtimeCaching: [
            {
              urlPattern: ({ url }) => url.pathname.startsWith('/productos'),
              handler: 'NetworkFirst',
              options: {
                cacheName: 'api-cache',
                expiration: {
                  maxEntries: 50,
                  maxAgeSeconds: 60 * 60
                }
              }
            },
            {
              urlPattern: ({ url }) => url.origin.includes('icon?family=Material+Icons'),
              handler: 'CacheFirst',
              options: {
                cacheName: 'material-icons-cache',
                expiration: {
                  maxEntries: 50,
                  maxAgeSeconds: 60 * 60
                }
              }
            }
          ]
        },

        manifest: {
          name: 'Super Lista compra',
          short_name: "Super lista",
          description: "Lista de compras para anotar los productos que quiero comprar.",
          start_url: '/',
          theme_color: "#432dd7",
          background_color: "#c1b0e8",
          display: 'standalone',
          icons: [
            {
                "purpose": "maskable",
                "sizes": "512x512",
                "src": "iconos/icon512_maskable.png",
                "type": "image/png"
            },
            {
                "purpose": "any",
                "sizes": "512x512",
                "src": "iconos/icon512_rounded.png",
                "type": "image/png"
            }
          ],
          screenshots: [
              {
              "src": "/screenshots/screenshot.jpg",
              "type": "image/jpg",
              "sizes": "1080x1920"
              }
          ]
        }
      }
    )
  ],
})
