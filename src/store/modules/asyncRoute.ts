import { asyncRoutes } from '@/router/index';

export const useAsyncRouteStore = defineStore(
  'asyncRoute',
  () => {
    const asyncRouters = ref([]);
    const dynamicRouteAdded = ref(false);
    const setAsyncRouters = (routes: any) => {
      asyncRouters.value = routes;
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
      const routes = asyncRoutes.filter(routeFilter);
      setAsyncRouters(routes);
      return routes;
    };
    return {
      asyncRouters,
      dynamicRouteAdded,
      setAsyncRouters,
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
