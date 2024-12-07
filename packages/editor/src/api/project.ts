import request from '@/utils/request';
import { ProjectCreateParams, ProjectUpdateParams, PageParams } from './types';
export default {
  checkAuth(params: { id: number }) {
    return request.post('/project/checkAuth', params);
  },
  getCategoryList(params: PageParams) {
    return request.get('/project/category', params);
  },

  // 新增项目
  addProject(params: ProjectCreateParams) {
    return request.post('/project/create', params);
  },

  // 删除项目
  delProject(params: { id: number; type?: string }) {
    return request.post('/project/delete', params);
  },

  // 获取项目详情
  getProjectDetail(id: number) {
    return request.get(`/project/detail/${id}`, {});
  },

  // 更新项目
  updateProject(params: ProjectUpdateParams) {
    return request.post('/project/update', params);
  },
};
