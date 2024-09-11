import { PageEnum } from '@/enums/pageEnum';
import { useUserStore } from '@/store/modules/user';
import { useAsyncRouteStore } from '@/store/modules/asyncRoute';
import { getToken } from '@/utils/auth';
import type { Router } from 'vue-router';
const whitePathList = [PageEnum.BASE_LOGIN]; // no redirect whitelist
export const createRouterGuards = (router: Router) => {
  const asyncRouteStore = useAsyncRouteStore();
  const userStore = useUserStore();

  router.beforeEach(async (to, from, next) => {
    if (whitePathList.includes(to.path as PageEnum)) {
      next();
      return;
    }
    const token = getToken();
    if (!token) {
      if (to.meta.ignoreAuth) {
        next();
        return;
      }
      const redirectData: {
        path: string;
        replace: boolean;
        query?: Recordable<string>;
      } = {
        path: PageEnum.BASE_LOGIN,
        replace: true
      };
      if (to.path) {
        redirectData.query = {
          ...redirectData.query,
          redirect: to.path
        };
      }
      next(redirectData);
      return;
    }
    if (asyncRouteStore.dynamicRouteAdded) {
      next();
      return;
    }
    const userInfo = await userStore.getUserInfo();
    const routes = asyncRouteStore.generateRoutes(userInfo);
    // 动态添加可访问路由表
    routes.forEach((route) => {
      router.addRoute(route);
    });
    asyncRouteStore.setDynamicRouteAdded(true);

    const redirectPath = (from.query.redirect || to.path) as string;
    const redirect = decodeURIComponent(redirectPath);
    const nextData = to.path === redirect ? { ...to } : { path: redirect };
    asyncRouteStore.setDynamicRouteAdded(true);
    next(nextData);
  });
  router.afterEach((to) => {
    document.title = (to?.meta?.title as string) || document.title; // 设置页面标题
  });
};
