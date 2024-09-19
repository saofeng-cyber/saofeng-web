import type { MockMethod } from 'vite-plugin-mock';
import Mock from 'mockjs';
export default [
  {
    url: '/api/login', // url参数必须为string格式
    method: 'post',
    response: ({ body }) => {
      const { username, password } = body;
      const Random = Mock.Random;

      const token = Random.string('upper', 32, 32);
      if (username === 'admin' && password === '123456') {
        return {
          code: 200,
          data: {
            token: token,
            expires_in: 60 // token过期时间
          },
          message: '登录成功'
        };
      } else {
        return {
          code: 500,
          data: {},
          message: '用户名或密码错误'
        };
      }
    }
  },
  {
    url: '/api/getUserInfo',
    method: 'get',
    response: () => {
      return {
        code: 200,
        data: {
          userInfo: {
            username: 'admin',
            avatar: 'https://q1.qlogo.cn/g?b=qq&nk=942391953&s=640',
            emial: 'admin@163.com'
          },
          permissionsList: ['admin'],
          roles: ['admin']
        },
        message: '获取用户信息成功'
      };
    }
  }
] as MockMethod[];
