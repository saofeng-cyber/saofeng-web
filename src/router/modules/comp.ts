import { WalletOutlined } from '@vicons/antd';
import { renderIcon } from '@/utils/tools';
import type { RouteCustom } from '@/typings/route';

const routeName = 'comp';

/**
 * @param name 路由名称, 必须设置,且不能重名
 * @param meta 路由元信息（路由附带扩展信息）
 * @param redirect 重定向地址, 访问这个路由时,自定进行重定向
 * @param meta.disabled 禁用整个菜单
 * @param meta.title 菜单名称
 * @param meta.icon 菜单图标
 * @param meta.keepAlive 缓存该路由
 * @param meta.sort 排序越小越排前
 *
 **/

const routes: Array<RouteCustom.RouteRaw> = [
  {
    path: '/comp',
    name: routeName,
    component: 'layout',
    redirect: '/comp/table',
    meta: {
      title: '组件示例',
      icon: renderIcon(WalletOutlined),
      sort: 2
    },
    children: [
      {
        path: 'table',
        name: `${routeName}_table`,
        component: () => import('@/views/components/table/index.vue'),
        meta: {
          title: '表格'
        }
      },
      {
        path: 'form',
        name: `${routeName}_form`,
        component: () => import('@/views/components/form/index.vue'),
        meta: {
          title: '表单',
          sort: 3
        }
      },
      {
        path: 'drag',
        name: `Drag`,
        meta: {
          title: '拖拽',
          sort: 2
        },
        component: () => import('@/views/components/drag/index.vue')
      },
      {
        path: 'mind',
        name: `Dind`,
        meta: {
          title: '思维的导图',
          sort: 3
        },
        component: () => import('@/views/components/mind/index.vue')
      }
    ]
  }
];

export default routes;
