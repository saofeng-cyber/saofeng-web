import type { RouteRecordRaw } from 'vue-router';
import Layout from '@/layout/index.vue';
import { SettingOutlined } from '@vicons/antd';
import { renderIcon } from '@/utils/tools';

const routes: Array<RouteRecordRaw> = [
  {
    path: '/system',
    name: 'system',
    component: Layout,
    redirect: '/system/index',
    meta: {
      title: '系统管理',
      sort: 3,
      isRoot: true,
      activeMenu: 'system_index',
      icon: renderIcon(SettingOutlined)
    },
    children: [
      {
        path: 'index',
        name: `system_index`,
        component: () => import('@/views/system/UserRole.vue'),
        meta: {
          title: '角色管理'
        }
      }
    ]
  }
];

export default routes;
