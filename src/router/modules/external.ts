import { LinkOutlined } from '@vicons/antd';
import { renderIcon } from '@/utils/tools';
import type { RouteCustom } from '@/typings/route';
const routeName = 'external';
const routes: Array<RouteCustom.RouteRaw> = [
  {
    path: '/external',
    name: 'external',
    component: 'layout',
    redirect: '/external/index',
    meta: {
      title: '外链',
      sort: 3,
      icon: renderIcon(LinkOutlined),
      roles: ['admin']
    },
    children: [
      {
        path: 'index',
        name: `${routeName}_index`,
        component: () => import('@/views/external/index.vue'),
        meta: {
          title: 'Naiv-Ui文档',
          externalLink: 'https://www.naiveui.com/'
        }
      }
    ]
  }
];

export default routes;
