import { PageEnum } from '@/enums/pageEnum';
import { useUserStore } from '@/store/modules/user';
import { useAsyncRouteStore } from '@/store/modules/asyncRoute';
import { useDiscteate } from '@/store/modules/discteate';
import { getToken } from '@/utils/auth';
import type { Router, RouteRecordRaw } from 'vue-router';
const whitePathList = [PageEnum.BASE_LOGIN]; // no redirect whitelist
export const createRouterGuards = (router: Router) => {
  const discteateStore = useDiscteate();
  router.beforeEach(async (to, from, next) => {
    const asyncRouteStore = useAsyncRouteStore();
    const userStore = useUserStore();
    discteateStore.loadingBar.start();
    if (whitePathList.includes(to.path as PageEnum)) return next();
    const token = getToken();
    if (token) {
      if (to.path === PageEnum.BASE_LOGIN)
        return next({ path: PageEnum.BASE_HOME, replace: true });
      if (asyncRouteStore.dynamicRouteAdded) return next();

      const userInfo = await userStore.getUserInfo();
      const routes = asyncRouteStore.generateRoutes(
        userInfo
      ) as RouteRecordRaw[];
      // 动态添加可访问路由表
      routes.forEach((route) => {
        router.addRoute(route);
      });
      // hack方法 确保addRoutes已完成
      const redirectPath = (from.query.redirect || to.path) as string;
      const redirect = decodeURIComponent(redirectPath);
      const nextData =
        to.path === redirect
          ? { path: to.path, replace: true }
          : { path: redirect };
      asyncRouteStore.setDynamicRouteAdded(true);
      next(nextData);
    } else {
      if (to.meta.ignoreAuth) return next();
      next({ path: PageEnum.BASE_LOGIN, replace: true });
    }
  });
  router.afterEach((to) => {
    document.title = (to?.meta?.title as string) || document.title; // 设置页面标题
    discteateStore.loadingBar.finish();
  });
};
