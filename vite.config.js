import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: '/ZasterZen/', // Achte auf die Groß-/Kleinschreibung!
  server: {
    hmr: {
      overlay: false
    }
  }
})
