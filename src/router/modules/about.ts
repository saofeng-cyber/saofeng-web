import { ProjectOutlined } from '@vicons/antd';
import { renderIcon } from '@/utils/tools';
import type { RouteCustom } from '@/typings/route';

const routes: Array<RouteCustom.RouteRaw> = [
  {
    path: '/about',
    name: 'about',
    component: 'layout',
    redirect: '/about/index',
    meta: {
      title: '关于',
      sort: 3,
      icon: renderIcon(ProjectOutlined),
      roles: ['admin']
    },
    children: [
      {
        path: 'index',
        name: `about_index`,
        component: () => import('@/views/about/index.vue'),
        meta: {
          title: '关于',
          hidden: false
        }
      },
      {
        path: 'resum',
        name: `resum_index`,
        component: () => import('@/views/resum/index.vue'),
        meta: {
          title: '问题',
          hidden: false
        }
      }
    ]
  }
];

export default routes;
