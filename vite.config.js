// import { defineConfig, loadEnv } from "vite";
// import vue from "@vitejs/plugin-vue";
// import compression from 'vite-plugin-compression';
// import { visualizer } from 'rollup-plugin-visualizer';

// export default defineConfig(({ mode }) => {
//   const env = loadEnv(mode, process.cwd(), "");

//   return {
//     base: env.VITE_BASE_URL || '/',
//     plugins: [
//       vue(),

//       //  GZIP compression for production
//       compression({
//         algorithm: 'gzip',
//         ext: '.gz',
//         deleteOriginFile: false
//       }),

//       //  Optional: Analyze bundle size
//       visualizer({
//         open: false, // change to true if you want it to open automatically
//         filename: 'dist/report.html',
//         gzipSize: true
//       }),
//     ],
//     build: {
//       target: "es2015",
//       minify: "esbuild",
//       cssCodeSplit: true, //  Separate CSS per component
//       sourcemap: false, // disable in production
//       rollupOptions: {
//         output: {
//           manualChunks(id) {
//             if (id.includes('node_modules')) {
//               return id.toString().split('node_modules/')[1].split('/')[0].toString();
//             }
//           },
//         },
//       },
//     },
//     server: {
//       proxy: {
//         "/api": {
//           target: "http://main.softitglobalbd.xyz/api",
//           changeOrigin: true,
//           rewrite: (path) => path.replace(/^\/api/, ""),
//         },
//       },
//     },
//     resolve: {
//       alias: {
//         '@': '/src', // cleaner import paths
//       },
//     },
//   };
// });
import { defineConfig, loadEnv } from "vite";
import vue from "@vitejs/plugin-vue";
import compression from 'vite-plugin-compression';
import { visualizer } from 'rollup-plugin-visualizer';

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "");

  return {
    base: env.VITE_BASE_URL || '/',
    plugins: [
      vue(),
      compression({
        algorithm: 'gzip',
        ext: '.gz',
        deleteOriginFile: false
      }),
      visualizer({
        open: false,
        filename: 'dist/report.html',
        gzipSize: true
      }),
    ],
    assetsInclude: ['**/*.woff', '**/*.woff2', '**/*.ttf', '**/*.eot'], //  include fonts
    build: {
      target: "es2015",
      minify: "esbuild",
      cssCodeSplit: true,
      sourcemap: false,
      rollupOptions: {
        output: {
          manualChunks(id) {
            if (id.includes('node_modules')) {
              return id.toString().split('node_modules/')[1].split('/')[0].toString();
            }
          },
        },
      },
    },
    server: {
      proxy: {
        "/api": {
          target: "http://main.softitglobalbd.xyz/api",
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/api/, ""),
        },
      },
    },
    resolve: {
      alias: {
        '@': '/src',
      },
    },
  };
});
