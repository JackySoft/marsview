import axios, { AxiosError } from 'axios';
import { message } from './AntdGlobal';
import router from '@/router';
import storage from './storage';

interface IResult {
  code: number;
  data: any;
  message: string;
}

const ErrorMsg = '服务异常，请稍后再试';

/**
 * 创建实例
 */
const instance = axios.create({
  timeout: 8000,
  timeoutErrorMessage: '请求超时，请稍后再试',
  withCredentials: true,
  headers: {},
});

// 请求拦截
instance.interceptors.request.use(
  (config) => {
    config.baseURL = import.meta.env.VITE_BASE_API;
    const token = storage.get('token');
    if (token) {
      config.headers = {
        Authorization: `Bearer ${token}`,
      };
    }
    return config;
  },
  (error: AxiosError) => {
    return Promise.reject(error);
  },
);

// 响应拦截
instance.interceptors.response.use(
  async (response) => {
    const res: IResult = await response.data;
    if (!res) {
      message.error(ErrorMsg);
      return Promise.reject(ErrorMsg);
    }
    if (res.code === 0) {
      return res.data;
    }
    if (res.code === 10018) {
      message.error('登录已过期，请重新登录');
      setTimeout(() => {
        window.location.replace(`/login?callback=${window.location.href}`);
        return null;
      }, 2000);
      return Promise.reject(res.message);
    } else if (res.code != 0) {
      message.error(res.message);
      return Promise.reject(res.message);
    }
    return res;
  },
  (error) => {
    if (error.response && error.response.status === 403) {
      router.navigate('/403');
    } else {
      message.error(error.message || ErrorMsg);
    }
    return Promise.reject(error.message);
  },
);

// 调用函数导出
export default {
  get<R = any>(url: string, params?: any): Promise<R> {
    return instance.get(url, {
      params,
    });
  },
  post<R = any>(url: string, params?: any): Promise<R> {
    return instance.post(url, params);
  },
};
