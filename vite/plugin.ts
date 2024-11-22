import vue from '@vitejs/plugin-vue';
import { createAutoImport } from './auto-import';
import { createSvgIcon } from './svg-icon';
import { createCompression } from './compression';
import { createSetupExtend } from './setup-extend';
import { createAutoComponents } from './auto-components';
import { configMockPlugin } from './mock';
import inspector from 'vite-plugin-dev-inspector';
import { VitePWA } from 'vite-plugin-pwa';
import { PluginOption } from 'vite';
import importToCDN from 'vite-plugin-cdn-import';
import { useMyPlugin } from './my-plugin';
export const createPlugins = (
  viteEnv: Record<string, any>,
  isBuild = false
) => {
  const vitePlugins = [vue(), inspector()] as PluginOption[];
  vitePlugins.push(useMyPlugin());
  vitePlugins.push(createAutoImport());
  vitePlugins.push(createAutoComponents());
  vitePlugins.push(createSvgIcon());
  vitePlugins.push(createSetupExtend());
  vitePlugins.push(configMockPlugin());
  vitePlugins.push(
    VitePWA({
      registerType: 'autoUpdate',
      manifest: {
        name: viteEnv.VITE_APP_NAME,
        short_name: viteEnv.VITE_APP_SHORT_NAME,
        description: viteEnv.VITE_APP_DESCRIPTION,
        theme_color: '#ffffff',
        icons: [
          {
            src: '/pwa-192x192.png',
            sizes: '192x192',
            type: 'image/png'
          },
          {
            src: '/pwa-512x512.png',
            sizes: '512x512',
            type: 'image/png'
          }
        ]
      },
      workbox: {
        globPatterns: ['**/*.{js,css,html,ico,png,svg}'],
        runtimeCaching: []
      }
    })
  );
  vitePlugins.push(
    importToCDN({
      modules: [
        {
          name: 'element-plus',
          var: 'ElementPlus',
          path: 'https://unpkg.com/element-plus/lib/index.js'
        }
      ]
    })
  );
  isBuild && vitePlugins.push(...createCompression(viteEnv));
  return vitePlugins;
};
