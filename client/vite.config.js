// import { defineConfig } from 'vite';
// import react from '@vitejs/plugin-react';
// import nodeGlobalsPolyfill from '@esbuild-plugins/node-globals-polyfill';

// export default defineConfig({
// 	server: {
// 		host: true,
// 		port: 2066,
// 	},
// 	build: {
// 		outDir: 'build',
// 		chunkSizeWarningLimit: 1600,
// 		rollupOptions: {
// 			output: {
// 				manualChunks(id) {
// 					if (id.includes('node_modules')) {
// 						return id.split('node_modules/')[1].split('/')[0];
// 					}
// 				},
// 			},
// 		},
// 	},
// 	plugins: [
// 		react(),
// 		nodeGlobalsPolyfill(),
// 		nodeGlobalsPolyfill({
// 			process: true,
// 			buffer: true,
// 		}),
// 	],
// 	optimizeDeps: {
// 		esbuildOptions: {
// 			define: {
// 				global: 'globalThis',
// 				process: 'globalThis.process',
// 			},
// 			plugins: [
// 				nodeGlobalsPolyfill({
// 					process: true,
// 					buffer: true,
// 				}),
// 			],
// 		},
// 	},
// 	resolve: {
// 		alias: {
// 			process: 'process/browser',
// 			stream: 'stream-browserify',
// 			zlib: 'browserify-zlib',
// 			util: 'util',
// 		},
// 	},
// 	define: {
// 		'process.env': {},
// 	},
// });
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import nodeGlobalsPolyfill from '@esbuild-plugins/node-globals-polyfill';

export default defineConfig({
	server: {
		host: true,
		port: 2066,
	},
	build: {
		outDir: 'build',
		chunkSizeWarningLimit: 1600,
		rollupOptions: {
			output: {
				manualChunks(id) {
					if (id.includes('node_modules')) {
						return id.split('node_modules/')[1].split('/')[0];
					} else {
						return 'bundle';
					}
				},
			},
		},
	},
	plugins: [
		react({ refresh: false }),
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
	define: {
		'process.env': {},
	},
});
