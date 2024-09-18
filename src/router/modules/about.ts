import type { RouteRecordRaw } from 'vue-router';
import Layout from '@/layout/index.vue';
import { ProjectOutlined } from '@vicons/antd';
import { renderIcon } from '@/utils/tools';

const routes: Array<RouteRecordRaw> = [
  {
    path: '/about',
    name: 'about',
    component: Layout,
    redirect: '/about/index',
    meta: {
      title: '关于',
      sort: 3,
      isRoot: true,
      activeMenu: 'about_index',
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
      }
    ]
  }
];

export default routes;
