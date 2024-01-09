import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import nodeGlobalsPolyfill from '@esbuild-plugins/node-globals-polyfill';

export default defineConfig({
	build: {
		outDir: 'build',
	},
	plugins: [react(), nodeGlobalsPolyfill()],
	optimizeDeps: {
		esbuildOptions: {
			define: {
				global: 'globalThis',
				process: 'globalThis.process',
			},
			plugins: [
				nodeGlobalsPolyfill({
					process: true,
					buffer: true,
				}),
			],
		},
	},
	resolve: {
		alias: {
			process: 'process/browser',
			stream: 'stream-browserify',
			zlib: 'browserify-zlib',
			util: 'util',
		},
	},
	define: {
		'process.env': {},
	},
});
