import type { App } from 'vue';
import { hasPermission } from './modules/hasPermisson';
import { hasRole } from './modules/hasRole';

export const initDirectives = (app: App<Element>) => {
  app.directive('hasperm', hasPermission);
  app.directive('hasRole', hasRole);
};
