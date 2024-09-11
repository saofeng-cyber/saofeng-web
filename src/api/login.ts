import service from '@/axios/service';

// 登录方法
export function login(params: { username: string; password: string }) {
  const data = { ...params };
  return service.request({
    url: '/login',
    headers: {
      isToken: false
    },
    method: 'post',
    data: data
  });
}

// 获取用户详细信息
export function getInfo() {
  return service.request({
    url: '/api/getInfo',
    method: 'get'
  });
}
