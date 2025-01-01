import request from '@/utils/request';
export default {
  checkAuth(params: { id: number }) {
    return request.post('/projects/checkAuth', params);
  },
  getCategoryList(params: any) {
    return request.get('/projects/list', params);
  },

  // 新增项目
  addProject(params: any) {
    return request.post('/projects/create', params);
  },

  // 删除项目
  delProject(params: { id: number; type?: string }) {
    return request.post('/projects/delete', params);
  },

  // 获取项目详情
  getProjectDetail(id: number) {
    return request.get(`/projects/detail/${id}`, {});
  },

  // 更新项目
  updateProject(params: any) {
    return request.post('/projects/update', params);
  },
};
