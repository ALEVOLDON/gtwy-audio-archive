import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '^/bcbits/.*': {
        target: 'https://t4.bcbits.com',
        changeOrigin: true,
        router: function (req) {
            // Extract subdomain from URL like /bcbits/t4/stream/...
            const match = req.url.match(/^\/bcbits\/([^\/]+)/);
            if (match) {
                return `https://${match[1]}.bcbits.com`;
            }
            return 'https://t4.bcbits.com';
        },
        rewrite: (path) => path.replace(/^\/bcbits\/[^\/]+/, '')
      },
      '/bandcamp': {
        target: 'https://gtwy.bandcamp.com',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/bandcamp/, '')
      }
    }
  }
})
