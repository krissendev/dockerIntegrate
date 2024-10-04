import { defineConfig } from 'vite'
import { svelte } from '@sveltejs/vite-plugin-svelte'

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  plugins: [svelte({
  
  //This section is for learning svlete build process, can be removed later
  // enabling sourcemaps in development and production
      compilerOptions: {
        dev: mode === 'development' // This is for better debugging in development
      }
  })],
  build: {
    sourcemap: mode === 'development' || mode === 'production',  // Enable source maps in development
    minify: mode !== 'development' // Disable minification in development if desired
  },

  server: {
    port: 3030,
    host: '0.0.0.0'
  },
  preview: {
    port: 8080,
    host: '0.0.0.0'
  }
}))
