import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  // Base path for GitHub Pages. Update if your repo name changes.
  base: '/Ctask/',
  plugins: [react()],
})
