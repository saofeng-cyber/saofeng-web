import {
  createRouter,
  createWebHistory,
  type RouteRecordRaw
} from 'vue-router';

import type { IModuleType } from './route';

const modules = import.meta.glob<IModuleType>('./modules/*.ts', {
  eager: true
});

const routeModuleList: RouteRecordRaw[] = Object.keys(modules).reduce(
  (pre, cur) => {
    const module = modules[cur].default ?? {};
    const moduleList = Array.isArray(module) ? module : [module];
    return (pre as any).concat(moduleList);
  },
  []
);

function sortRoute(a: any, b: any) {
  return (a.meta?.sort ?? 0) - (b.meta?.sort ?? 0);
}

routeModuleList.sort(sortRoute);

export const LoginRoute: RouteRecordRaw = {
  path: '/login',
  name: 'Login',
  component: () => import('@/views/login/index.vue'),
  meta: {
    title: '登录'
  }
};

export const HomeRoute: RouteRecordRaw = {
  path: '/',
  name: 'Home',
  redirect: '/dashboard'
};

//需要验证权限
export const asyncRoutes = [...routeModuleList];

//普通路由 无需验证权限
export const constantRouter: RouteRecordRaw[] = [LoginRoute, HomeRoute];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: constantRouter,
  strict: true,
  scrollBehavior: () => ({ left: 0, top: 0 })
});

export default router;
