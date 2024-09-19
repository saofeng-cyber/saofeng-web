import type { MockMethod } from 'vite-plugin-mock';
import Mock from 'mockjs';
export default [
  {
    url: '/api/getTableList', // url参数必须为string格式
    method: 'post',
    response: () => {
      return {
        code: 200,
        data: {
          list: Mock.mock({
            'list|10': [
              {
                'id|+1': 1,
                name: '@cname',
                age: '@integer(18, 60)',
                address: '@county(true)',
                date: '@date("yyyy-MM-dd")'
              }
            ]
          })
        }
      };
    }
  }
] as MockMethod[];
