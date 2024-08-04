import request from '@/utils/request';
import { PageParams } from './types';

export interface ILib {
  id: number;
  tag: string;
  name: string;
  description?: string;
  react_source: string;
  less_source: string;
  config_source: string;
  md_source: string;
  hash: string;
  release_id: string;
  react_url?: string;
  css_url?: string;
  config_url?: string;
  react_config: string;
  release_hash: string;
  user_id: string;
  sso_name: string;
  created_at: string;
  updated_at: string;
}
export type ILibPublish = {
  id: number;
  tag: string;
  name: string;
  react_url: string;
  css_url?: string;
  config_url: string;
  release_id: string;
  release_hash: string;
};
// 获取组件列表
export const getLibList = (params: PageParams & { keyword?: string }) => {
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
export const updateLib = (params: {
  react_source: string;
  less_source: string;
  config_source: string;
  md_source: string;
  id: string;
  hash: string;
}) => {
  return request.post('/lib/update', params);
};

// 发布组件
export const publish = (params: {
  lib_id: number;
  release_id: string;
  react_url: string;
  css_url?: string;
  config_url: string;
  release_hash: string;
}) => {
  return request.post('/lib/publish', params);
};
