import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],

  server: {
    proxy: {
      // Proxy /api/* requests to your Express server
      '/api': 'http://localhost:3000', // Adjust the port to match your Express server's port
    },
  },
})
