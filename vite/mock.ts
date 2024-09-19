/**
 * Mock plugin for development and production.
 * https://github.com/anncwb/vite-plugin-mock
 */
import { viteMockServe } from 'vite-plugin-mock';

export function configMockPlugin() {
  return viteMockServe({
    mockPath: 'src/mock', // mock文件夹路径
    enable: true
  });
}
