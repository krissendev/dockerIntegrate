import { defineConfig } from 'vite'
import { svelte } from '@sveltejs/vite-plugin-svelte'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [svelte()],
  server: {
    port: 3030,
    host: '0.0.0.0'
  },
  preview: {
    port: 8080,
    host: '0.0.0.0'
  }
})
