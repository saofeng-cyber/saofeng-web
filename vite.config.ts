import { fileURLToPath, URL } from 'node:url';

import { defineConfig, loadEnv } from 'vite';

import { createPlugins } from './vite/plugin';

// https://vitejs.dev/config/
export default defineConfig(({ mode, command }) => {
  const env = loadEnv(mode, process.cwd());
  const { VITE_PUBLIC_PATH, VITE_OUTPUT_DIR } = env;
  return {
    base: VITE_PUBLIC_PATH,
    plugins: createPlugins(env, command === 'build'),
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url))
      },
      extensions: ['.mjs', '.js', '.ts', '.jsx', '.tsx', '.json', '.vue']
    },
    envDir: './env',
    server: {
      port: 8088,
      open: true,
      host: true,
      proxy: {
        // https://cn.vitejs.dev/config/#server-proxy
        '/api': {
          target: 'http://localhost:5173/',
          changeOrigin: true,
          rewrite: (p) => p.replace(/^\/dev-api/, '')
        }
      }
    },
    build: {
      outDir: VITE_OUTPUT_DIR
    }
  };
});
