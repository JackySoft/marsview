import axios from 'axios';
import { usePageStore } from '@materials/stores/pageStore';
import { handleArrayVariable } from './util';
declare module 'axios' {
  interface AxiosRequestConfig {
    isCors?: boolean;
  }
}
/**
 * Marsview组件专用请求，跟平台请求区分开
 * 配置request请求时的默认参数
 */
const instance = axios.create({
  timeout: 8000,
  withCredentials: true,
  headers: {},
  isCors: true,
});
// 请求拦截
instance.interceptors.request.use((config) => {
  const {
    headers = [],
    timeout = 8,
    timeoutErrorMessage = '请求超时，请稍后重试',
    requestInterceptor,
  } = usePageStore.getState().page.pageData.interceptor || {};
  config.timeout = timeout * 1000;
  config.timeoutErrorMessage = timeoutErrorMessage;
  config.headers = {
    ...config.headers,
    ...handleArrayVariable(headers),
    Accept: 'application/json, text/plain, */*',
    proxyApi: config.isCors ? config.url : '',
  };
  // 接口跨域转发
  if (config.isCors) {
    config.url = `${import.meta.env.VITE_BASE_API}/ai/proxy`;
  }
  if (requestInterceptor) {
    const requestConfig = new Function('config', `return (${requestInterceptor})(config);`);
    return requestConfig(config);
  }
  return config;
});

// 响应拦截器
instance.interceptors.response.use(
  (response) => {
    const { responseInterceptor } = usePageStore.getState().page.pageData.interceptor;
    // 返回拦截
    let res = response;
    if (responseInterceptor) {
      const responseFn = new Function('response', `return (${responseInterceptor})(response);`);
      res = responseFn(response);
    }
    return res;
  },
  (error) => {
    let errorMsg = error.message;
    if (error.code === 'ERR_NETWORK') {
      errorMsg = '服务地址或网络异常，请稍后重试';
    }
    return Promise.reject(errorMsg);
  },
);

// 调用函数导出
export default {
  defaults: instance.defaults,
  get<R = any>(url: string, config: any = {}): Promise<R> {
    return instance.get(url, config);
  },
  post<R = any>(url: string, params: any = {}, config: any = {}): Promise<R> {
    return instance.post(url, params, config);
  },
  put<R = any>(url: string, params: any = {}, config: any = {}): Promise<R> {
    return instance.put(url, params, config);
  },
  patch<R = any>(url: string, params: any = {}, config: any = {}): Promise<R> {
    return instance.patch(url, params, config);
  },
  delete<R = any>(url: string, config: any = {}): Promise<R> {
    return instance.delete(url, config);
  },
  download(url: string, params: any = {}, config: any = {}) {
    return instance.post(url, params, { ...config, responseType: 'blob' }).then((response) => {
      const blob = new Blob([response.data], { type: response.data.type });
      const link = document.createElement('a');
      const fileNameHeader = response.headers['filename'];
      if (fileNameHeader) {
        link.download = decodeURIComponent(fileNameHeader); //下载后文件名;
      } else {
        link.download = config.filename || 'fileName.xls';
      }
      link.href = URL.createObjectURL(blob);
      document.body.appendChild(link);
      link.click(); //点击下载
      document.body.removeChild(link); //下载完成移除元素
      window.URL.revokeObjectURL(link.href); //释放掉blob对象
      return response;
    });
  },
};
