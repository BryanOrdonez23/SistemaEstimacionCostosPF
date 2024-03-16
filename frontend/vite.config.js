import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  origin:"/apps/costo/",
  server: {
    host: true,
    strictPort: true,
    port: 4173,
  },

  preview: {
    host: true,
    port: 4173,
  },
})
