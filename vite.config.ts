import { fileURLToPath, URL } from 'node:url';

import { defineConfig, loadEnv } from 'vite';

import { createPlugins } from './vite/plugin';

// https://vitejs.dev/config/
export default defineConfig(({ mode, command }) => {
  const env = loadEnv(mode, process.cwd() + '/env');
  const { VITE_BASE_URL, VITE_OUTPUT_DIR } = env;
  // console.log(env);

  return {
    base: VITE_BASE_URL,
    plugins: createPlugins(env, command === 'build'),
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url))
      },
      extensions: ['.mjs', '.js', '.ts', '.jsx', '.tsx', '.json', '.vue']
    },
    envDir: './env',
    envPrefix: 'VITE_',
    server: {
      port: 8088,
      open: true,
      host: true
    },
    build: {
      outDir: VITE_OUTPUT_DIR, // 输出目录
      target: 'es2015', // 设置最终构建的浏览器兼容目标
      cssTarget: 'chrome80', // 需要兼容的浏览器最低版本
      reportCompressedSize: false, // 打包后是否生成压缩大小报告
      rollupOptions: {
        output: {
          chunkFileNames(chunkInfo) {
            return `js/${chunkInfo.name}.[hash].js`;
          },
          entryFileNames(chunkInfo) {
            return `js/${chunkInfo.name}.[hash].js`;
          },
          assetFileNames(chunkInfo) {
            return `assets/${chunkInfo.name}.[hash].[ext]`;
          }
        }
        // external: ['vue', 'vue-router', 'pinia', 'axios', '@vueuse/core']
      }
    }
  };
});
