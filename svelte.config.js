import adapter from '@sveltejs/adapter-vercel'; // Use the Vercel adapter
import { vitePreprocess } from '@sveltejs/kit/vite';

/** @type {import('@sveltejs/kit').Config} */
const config = {
    kit: {
        adapter: adapter(), // Use the Vercel adapter
        alias: {
            '@': 'src'
        }
    },
    preprocess: vitePreprocess()
};

export default config;