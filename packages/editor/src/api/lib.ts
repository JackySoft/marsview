import request from '@/utils/request';
import { PageParams } from './types';

export interface ILib {
  id: number;
  tag: string;
  name: string;
  description?: string;
  reactCode: string;
  lessCode: string;
  configCode: string;
  mdCode: string;
  hash: string;
  releaseId: string;
  reactUrl?: string;
  cssUrl?: string;
  configUrl?: string;
  reactConfig: string;
  releaseHash: string;
  userId: string;
  userName: string;
  createdAt: string;
  updatedAt: string;
}
export type ILibPublish = {
  id: number;
  tag: string;
  name: string;
  reactUrl: string;
  cssUrl?: string;
  configUrl: string;
  releaseId: string;
  releaseHash: string;
};
// 获取组件列表
export const getLibList = (params: Omit<PageParams, 'projectId'> & { type: number }) => {
  return request.get('/lib/list', params, { showLoading: false });
};

// 获取安装组件列表
export const getInstallList = () => {
  return request.post<ILibPublish[]>('/lib/install/list', {}, { showLoading: false });
};

// 获取组件详情
export const getLibDetail = (id: number) => {
  return request.get<ILib>(`/lib/detail/${id}`);
};

// 创建组件
export const createLib = (params: { tag: string; name: string; description?: string }) => {
  return request.post('/lib/create', params);
};

// 保存组件
export const updateLib = (params: { reactCode: string; lessCode: string; configCode: string; mdCode: string; id: string; hash: string }) => {
  return request.post('/lib/update', params);
};

// 发布组件
export const publish = (params: { libId: number; reactCompile: string; cssCompile?: string; configCode: string; releaseHash: string }) => {
  return request.post('/lib/publish', params);
};
