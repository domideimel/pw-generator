import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import { VitePWA } from 'vite-plugin-pwa';

export default defineConfig({
  plugins: [vue(), VitePWA({
    registerType: 'autoUpdate',
    includeAssets: ['favicon.ico', 'robots.txt', 'pwa-192x192.png', 'pwa-512x512.png','*.woff2'],
    manifest: {
      'name': 'PWGen',
      'short_name': 'PWGen',
      'theme_color': '#101014',
      'background_color': '#101014',
      'display': 'standalone',
      'orientation': 'portrait',
      'scope': '/',
      'start_url': '/',
      'icons': [{
        'src': 'pwa-192x192.png',
        'type': 'image/png',
        'sizes': '192x192'
      }, {
        'src': 'pwa-512x512.png',
        'type': 'image/png',
        'sizes': '512x512'
      }]
    }
  })]
});
