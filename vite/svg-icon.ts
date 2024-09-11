import { createSvgIconsPlugin } from 'vite-plugin-svg-icons';
import path from 'path';

export function createSvgIcon() {
  return createSvgIconsPlugin({
    iconDirs: [path.resolve(process.cwd(), 'src/assets/icons/svg')],
    symbolId: 'icon-[dir]-[name]',
    inject: 'body-last',
    customDomId: '__svg__icons__dom__'
  });
}
