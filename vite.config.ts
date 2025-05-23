import path from 'node:path'
import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'
import { svgsprites } from './vite_plugins/svgsprites'

// https://vite.dev/config/
export default defineConfig(({ command }) => ({
  define: {
    isDev: command === 'serve', // window.isDev = true / false
  },
  server: {
    port: 7000,
  },
  plugins: [react(), svgsprites()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
}))
