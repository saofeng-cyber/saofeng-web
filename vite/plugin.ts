import vue from '@vitejs/plugin-vue';
import { createAutoImport } from './auto-import';
import { createSvgIcon } from './svg-icon';
import { createCompression } from './compression';
import { createSetupExtend } from './setup-extend';
import { createAutoComponents } from './auto-components';
import { configMockPlugin } from './mock';
export const createPlugins = (
  viteEnv: Record<string, any>,
  isBuild = false
) => {
  const vitePlugins = [vue()];
  vitePlugins.push(createAutoImport());
  vitePlugins.push(createAutoComponents());
  vitePlugins.push(createSvgIcon());
  vitePlugins.push(createSetupExtend());
  vitePlugins.push(configMockPlugin());
  isBuild && vitePlugins.push(...createCompression(viteEnv));
  return vitePlugins;
};
