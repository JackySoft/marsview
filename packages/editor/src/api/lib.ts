import request from '@/utils/request';

// 获取安装组件列表
export const getInstallList = () => {
  return request.post<any[]>('/lib/install/list', {}, { showLoading: false });
};
