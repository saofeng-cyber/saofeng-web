import service from '@/axios/service';

// 获取路由
export const getRouters = () => {
  return service.request({
    url: '/getRouters',
    method: 'get'
  });
};
