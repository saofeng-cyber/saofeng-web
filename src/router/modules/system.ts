import { SettingOutlined } from '@vicons/antd';
import { renderIcon } from '@/utils/tools';
import type { RouteCustom } from '@/typings/route';

const routes: Array<RouteCustom.RouteRaw> = [
  {
    path: '/system',
    name: 'system',
    component: 'layout',
    redirect: '/system/index',
    meta: {
      title: '系统管理',
      sort: 3,
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
