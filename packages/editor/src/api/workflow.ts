import request from '@/utils/request';

export interface IWorkFlow {
  id: number;
  formName: string;
  formDesc: string;
  pageId: number;
  templateData: string;
  userId: number;
  userName: string;
  createdAt: string;
  updatedAt: string;
}
export default {
  // 获取模板列表
  getTemplateList: (params: { pageNum: number; pageSize: number; keyword: string }) => {
    return request.get('/workflow/list', params, { showLoading: false });
  },
  // 获取模板详情
  getTemplateDetail: (id: number) => {
    return request.get<IWorkFlow>(`/workflow/detail/${id}`);
  },
  // 创建模板
  createTemplate: (params: { formName: string; formDesc?: string }) => {
    return request.post('/workflow/create', params);
  },
  // 更新模板
  updateTemplate: (params: Pick<IWorkFlow, 'id' | 'templateData'>) => {
    return request.post('/workflow/update', params);
  },
  // 删除模板
  deleteTemplate: (id: number) => {
    return request.post(`/workflow/delete/${id}`);
  },
};
