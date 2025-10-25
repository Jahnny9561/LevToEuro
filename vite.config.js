import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa' 

export default defineConfig({
  base: '/LevToEuro',
  plugins: [
    react(),
    
    VitePWA({
      registerType: 'autoUpdate',

      // For testing in dev mode (npm run dev)
      devOptions: {
        enabled: true
      },

      // Caching for offline support
      workbox: {
        globPatterns: ['**/*.{js,css,html,ico,png,svg}']
      },

      // The "Web App Manifest"
      manifest: {
        name: 'LevToEuroCalculator',
        short_name: 'LevToEuro',
        description: 'Calculator for Bulgaria\'s transition from Lev to Euro.',
        theme_color: '#ffcc00', // Your app's yellow color
        background_color: '#f2f2f2',
        display: 'standalone',
        scope: '/LevToEuro/',
        start_url: '/LevToEuro/',   
        icons: [
          {
            src: 'pwa-192x192.png', 
            sizes: '192x192',
            type: 'image/png'
          },
          {
            src: 'pwa-512x512.png', 
            sizes: '512x512',
            type: 'image/png'
          }
        ],

        screenshots: [
          {
            "src": "screenshot-mobile.png",
            "sizes": "516x1116", 
            "type": "image/png",
            "form_factor": "narrow" 
          },
          {
            "src": "screenshot-desktop.png",
            "sizes": "2254x1250", 
            "type": "image/png",
            "form_factor": "wide" 
          }
        ]
      }
    })
  ]
})