import request from '@/utils/request';
import { PageParams } from './types';

export interface IWorkFlow {
  id: number;
  form_name: string;
  form_desc: string;
  page_id: number;
  template_data: string;
  user_id: number;
  user_name: string;
  created_at: string;
  updated_at: string;
}
export default {
  // 获取模板列表
  getTemplateList: (params: PageParams) => {
    return request.get('/workflow/list', params, { showLoading: false });
  },
  // 获取模板详情
  getTemplateDetail: (id: number) => {
    return request.get<IWorkFlow>(`/workflow/detail/${id}`);
  },
  // 创建模板
  createTemplate: (params: { form_name: string; form_desc?: string }) => {
    return request.post('/workflow/create', params);
  },
  // 更新模板
  updateTemplate: (params: Omit<IWorkFlow, 'id'>) => {
    return request.post('/workflow/update', params);
  },
  // 删除模板
  deleteTemplate: (id: number) => {
    return request.post(`/workflow/delete/${id}`);
  },
};
