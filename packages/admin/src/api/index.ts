import request from '@/utils/request';

// 用户登录
export const login = async <T>(params: T) => {
  return request.post('/user/login', params);
};

// 获取用户信息
export const getUserInfo = async () => {
  return request.get('/user/info');
};

// 获取用户头像
export const getUserAvatar = () => {
  // TODO 等后续接入微信扫码后生成用户头像
  return Promise.resolve({
    avatar: '',
  });
};

// 获取页面详情
export const getPageDetail = (env: string, id: number) => {
  return request.get(`/admin/page/detail/${env}/${id}`);
};

// 获取项目列表
export const getProjectList = (params: { pageNum: number; pageSize: number }) => {
  return request.get('/admin/project/list', params);
};

// 获取项目对应的菜单列表
export const getProjectMenu = (projectId: string | number) => {
  return request.get('/admin/menu/list/' + projectId);
};

// 获取项目配置
export const getProjectDetail = (projectId: string | number) => {
  return request.get('/admin/getProjectConfig?project_id=' + projectId);
};
