import { asyncRoutes } from '@/router/index';
export const useAsyncRouteStore = defineStore({
  id: 'asyncRoute',
  state: () => ({
    asyncRoutes, // 需要权限的路由
    menuList: []
  }),
  actions: {
    setAsyncRoutes(routes: any) {
      this.asyncRoutes = routes;
    }
  }
});
