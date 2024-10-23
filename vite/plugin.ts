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
export const createPlugins = (
  viteEnv: Record<string, any>,
  isBuild = false
) => {
  const vitePlugins = [vue(), inspector()] as PluginOption[];
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
  isBuild && vitePlugins.push(...createCompression(viteEnv));
  return vitePlugins;
};
