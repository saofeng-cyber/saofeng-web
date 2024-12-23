import { renderIcon } from '@/utils/tools';
import { DashboardOutlined } from '@vicons/antd';
import type { RouteCustom } from '@/typings/route';

const routeName = 'dashboard';

/**
 * @param name 路由名称, 必须设置,且不能重名
 * @param meta 路由元信息（路由附带扩展信息）
 * @param redirect 重定向地址, 访问这个路由时,自定进行重定向
 * @param meta.disabled 禁用整个菜单
 * @param meta.title 菜单名称
 * @param meta.icon 菜单图标
 * @param meta.keepAlive 缓存该路由
 * @param meta.sort 排序越小越排前
 **/

const routes: Array<RouteCustom.RouteRaw> = [
  {
    path: '/dashboard',
    name: routeName,
    redirect: '/dashboard/console',
    component: 'layout',
    meta: {
      title: '数据分析',
      icon: renderIcon(DashboardOutlined),
      sort: 0
    },
    children: [
      {
        path: 'console',
        name: `${routeName}_console`,
        meta: {
          title: '主控台',
          affix: true
        },
        component: () => import('@/views/dashboard/console/console.vue')
      },
      {
        path: 'monitor',
        name: `${routeName}_monitor`,
        meta: {
          title: '监控页'
        },
        component: () => import('@/views/dashboard/monitor/monitor.vue')
      },
      {
        path: 'workplace',
        name: `${routeName}_workplace`,
        meta: {
          title: '工作台',
          keepAlive: true
        },
        component: () => import('@/views/dashboard/workplace/workplace.vue')
      }
    ]
  }
];

export default routes;
