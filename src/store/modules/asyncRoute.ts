import { asyncRoutes } from '@/router/index';
import type { RouteCustom } from '@/typings/route';
import { createRoute, hasChildren, menuFilter } from '../help';

export const useAsyncRouteStore = defineStore(
  'asyncRoute',
  () => {
    const asyncRouters = ref<any[]>([]);
    const menuOption = ref([]);
    const dynamicRouteAdded = ref(false);

    const setAsyncRouters = (routes: RouteCustom.RouteRaw[]) => {
      const routeLast = routes.map((route: RouteCustom.RouteRaw) => {
        if (hasChildren(route)) {
          route.children = route.children!.map((child) => {
            return createRoute(child);
          });
        }
        return createRoute(route);
      });
      return routeLast;
    };
    const setMenuOption = (routes: any) => {
      menuOption.value = routes.filter(menuFilter);
    };
    const setDynamicRouteAdded = (flag: boolean) => {
      dynamicRouteAdded.value = flag;
    };
    const generateRoutes = (data: any) => {
      const permissionsList = data.permissionsList ?? [];
      const routeFilter = (route: any) => {
        const { meta } = route;
        const { permissions } = meta || {};
        if (!permissions) return true;
        return permissionsList.some((item: string) =>
          permissions.includes(item)
        );
      };
      const routes = asyncRoutes.filter(routeFilter) as RouteCustom.RouteRaw[];
      setMenuOption(routes); // 设置菜单
      const perfectRoutes = setAsyncRouters(routes); // 设置路由
      // asyncRouters.value = perfectRoutes; // 设置异步路由
      return perfectRoutes;
    };
    return {
      asyncRouters,
      menuOption,
      setMenuOption,
      dynamicRouteAdded,
      setDynamicRouteAdded,
      generateRoutes
    };
  },
  {
    persistedState: {
      persist: false
    }
  }
);
