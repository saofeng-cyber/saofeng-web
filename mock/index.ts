import type { MockMethod } from 'vite-plugin-mock';
import Mock from 'mockjs';

/**
 * mockjs 语法参考: https://github.com/nuysoft/Mock/wiki/Syntax-Specification
 * mockjs 文档: https://github.com/nuysoft/Mock/wiki
 * mockjs 生成随机数据: https://github.com/nuysoft/Mock/wiki/API
 * mockjs 生成随机图片: https://github.com/nuysoft/Mock/wiki/API#image
 * mockjs 生成随机文本: https://github.com/nuysoft/Mock/wiki/API#paragraph
 * mockjs 生成随机姓名: https://github.com/nuysoft/Mock/wiki/API#name
 * mockjs 生成随机地址: https://github.com/nuysoft/Mock/wiki/API#address
 * mockjs 生成随机时间: https://github.com/nuysoft/Mock/wiki/API#datetime
 * mockjs 生成随机颜色: https://github.com/nuysoft/Mock/wiki/API#color
 * mockjs 生成随机标题: https://github.com/nuysoft/Mock/wiki/API#ctitle
 *
 **/

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
            user: {
              name: 'admin',
              avatar: 'https://cdn.vuetifyjs.com/images/john.jpg'
            }
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
  }
] as MockMethod[];
