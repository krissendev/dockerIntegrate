//npm uninstall @sveltejs/adapter-auto
//npm install @sveltejs/adapter-node@4.0.0 -D

import adapter from '@sveltejs/adapter-node';
import path from 'path'
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';
const config = {
	preprocess: vitePreprocess(),
	kit: {
		// adapter-auto only supports some environments, see https://svelte.dev/docs/kit/adapter-auto for a list.
		// If your environment is not supported, or you settled on a specific environment, switch out the adapter.
		// See https://svelte.dev/docs/kit/adapters for more information about adapters.
		adapter: adapter({
			esmodules: true 
		  }),
		csrf: {
			checkOrigin: true
		},
		alias:{
			$store: path.resolve('./src/store'), 
			$styles: path.resolve('./src/styles'),
			$pages: path.resolve('./src/lib/pages')
		}
	}
};

export default config;
