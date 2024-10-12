import type { RouteCustom } from '@/typings/route';
import BaseLayout from '@/layout/index.vue';
import parentLayout from '@/layout/parentLayout.vue';
import ExternalLayout from '@/views/external/index.vue';
export const hasChildren = (route: RouteCustom.RouteRaw) => {
  return route.children && route.children.length > 0;
};

export const createRoute = (route: RouteCustom.RouteRaw) => {
  const { component } = route;
  const routeItem = { ...route }; // 深拷贝
  if (component === 'layout') {
    routeItem.component = BaseLayout;
  } else if (component === 'parent') {
    routeItem.component = parentLayout;
  } else if (component === 'external') {
    routeItem.component = ExternalLayout;
  } else {
    routeItem.component = component;
  }
  return routeItem;
};

export const menuFilter = (route: any) => {
  const { meta } = route;
  const { hidden } = meta || {};
  if (route.children) {
    // 递归子路由
    route.children = route.children.filter(menuFilter);
  }
  return !hidden;
};
