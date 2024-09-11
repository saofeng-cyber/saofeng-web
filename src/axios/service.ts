import axios from 'axios';
import type {
  AxiosError,
  AxiosInstance,
  AxiosResponse,
  InternalAxiosRequestConfig
} from './types/index';
import { REQUEST_TIMEOUT } from './constant';
import { getToken } from '@/utils/auth';
export const PATH_URL = import.meta.env.VITE_APP_BASE_API;

const service: AxiosInstance = axios.create({
  timeout: REQUEST_TIMEOUT,
  baseURL: PATH_URL
});

service.interceptors.request.use((config: InternalAxiosRequestConfig) => {
  // const controller = new AbortController();
  // res.signal = controller.signal;
  config.headers['Authorization'] = 'Bearer ' + getToken();
  return config;
});

service.interceptors.response.use(
  (res: AxiosResponse) => {
    // 这里不能做任何处理，否则后面的 interceptors 拿不到完整的上下文了
    return res.data;
  },
  (error: AxiosError) => {
    console.log('err： ' + error); // for debug
    return Promise.reject(error);
  }
);

export default service;
