import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import nodeGlobalsPolyfill from '@esbuild-plugins/node-globals-polyfill';

import dsv from '@rollup/plugin-dsv';
export default defineConfig({
	server: {
		host: true,
		port: 2055,
	},
	build: {
		outDir: 'build',
		chunkSizeWarningLimit: 1600,
		rollupOptions: {
			output: {
				manualChunks(id) {
					if (id.includes('node_modules')) {
						return id.split('node_modules/')[1].split('/')[0];
					}
				},
				format: 'es',
			},
		},
	},
	plugins: [
		react(),
		nodeGlobalsPolyfill(),
		dsv(),
		nodeGlobalsPolyfill({
			process: true,
			buffer: true,
		}),
	],
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
