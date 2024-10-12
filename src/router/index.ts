import {
  createRouter,
  createWebHistory,
  type RouteRecordRaw
} from 'vue-router';

export interface IModuleType {
  default: Array<RouteRecordRaw> | RouteRecordRaw;
}

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

function sortRoute(a: RouteRecordRaw, b: RouteRecordRaw) {
  if (a.children) {
    a.children.sort(sortRoute);
  }
  if (b.children) {
    b.children.sort(sortRoute);
  }
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

export const BlackRoute: RouteRecordRaw = {
  path: 'redirect',
  name: 'Redirect',
  component: () => import('@/views/redirect/index.vue')
};

export const errorRoute: RouteRecordRaw[] = [
  {
    path: '/:pathMatch(.*)*',
    name: 'ErrorPage',
    component: () => import('@/layout/index.vue'),
    redirect: '/404',
    meta: {
      hideBreadcrumb: true,
      title: 'ErrorPage'
    },
    children: [
      {
        path: '/:path(.*)*',
        name: 'ErrorPageSon',
        component: () => import('@/views/error/index.vue'),
        meta: {
          title: 'ErrorPageSon',
          hideBreadcrumb: true
        }
      }
    ]
  }
];

//需要验证权限
export const asyncRoutes = [...routeModuleList];

//普通路由 无需验证权限
export const constantRouter: RouteRecordRaw[] = [
  LoginRoute,
  HomeRoute,
  ...errorRoute
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: constantRouter,
  strict: true,
  scrollBehavior: () => ({ left: 0, top: 0 })
});

export default router;
