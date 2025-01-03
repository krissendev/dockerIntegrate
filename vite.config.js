import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';

export default defineConfig(({ mode }) => ({
	plugins: [
		sveltekit({
			// Enable sourcemaps based on the mode
			compilerOptions: {
				dev: mode === 'development',
			},
		}),
	],
	build: {
		// Enable sourcemaps in both dev and production
		sourcemap: mode === 'development' || mode === 'production',
		minify: mode !== 'development', // Optional: Disable minification in development
	},
	server: {
		port: 5173, // Default dev server port for SvelteKit
		host: '0.0.0.0',
	},
	preview: {
		port: 8080, // Set to the desired preview port (e.g., 8080 for GCP compatibility)
		host: '0.0.0.0',
	},
}));
