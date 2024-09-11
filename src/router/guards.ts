import { PageEnum } from '@/enums/pageEnum';
import { useAppStore } from '@/store/modules/app';
import { useAsyncRouteStore } from '@/store/modules/asyncRoute';
import type { Router } from 'vue-router';

export const createRouterGuards = (router: Router) => {
  const asyncRouteStore = useAsyncRouteStore();
  const appStore = useAppStore();
  const isToken = computed(() => appStore.token);
  const createRoute = async () => {
    console.log(666);

    asyncRouteStore.asyncRoutes.forEach((route) => {
      router.addRoute(toRaw(route));
    });
  };
  createRoute();
  router.beforeEach((to, from, next) => {
    if (!isToken.value) {
      if (to.meta.ignoreAuth) {
        next();
        return;
      }
      if (to.path !== PageEnum.BASE_LOGIN) {
        next(PageEnum.BASE_LOGIN);
        return;
      }
      next();
    } else {
      next();
    }
  });
  router.afterEach((to) => {
    document.title = (to?.meta?.title as string) || document.title; // 设置页面标题
  });
};
