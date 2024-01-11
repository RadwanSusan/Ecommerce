import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import nodeGlobalsPolyfill from '@esbuild-plugins/node-globals-polyfill';

export default defineConfig({
	build: {
		outDir: 'build',
		chunkSizeWarningLimit: 1600, // Increase the limit to avoid the warning
		rollupOptions: {
			output: {
				manualChunks(id) {
					if (id.includes('node_modules')) {
						return id.split('node_modules/')[1].split('/')[0];
					}
				},
			},
		},
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
