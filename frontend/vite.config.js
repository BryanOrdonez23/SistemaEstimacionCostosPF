import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/apps/costo/',
  preview: {
    port: 4173,
    strictPort: true,
   },
  server: {
    host: true,
    strictPort: true,
    port: 4173,
    origin: 'https://computacion.unl.edu.ec/apps/costo'
  },
})
