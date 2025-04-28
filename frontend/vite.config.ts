import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { fileURLToPath, URL } from 'node:url';
import tailwindcss from '@tailwindcss/vite'; 

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(), 
    tailwindcss()
  ],
  css: {}, 
  resolve: {
    alias: {
      '@my-blog/common': fileURLToPath(
        new URL('../packages/common/src', import.meta.url)
      )
    }
  },
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:8000',   // Express port
        changeOrigin: true
      }
    }
  }
})
