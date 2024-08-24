import request from '@/utils/request';
import {
  PageParams,
  PageReqParams,
  CreatePageParams,
  PublishPageParams,
  PublishListParams,
  ProjectListParams,
  ProjectCreateParams,
  ProjectUpdateParams,
  UserListParams,
  UserCreateParams,
  Menu,
  Role,
} from './types';

// 获取页面列表
export const getPageList = (params: PageParams) => {
  return request.get('/page/list', params, { showLoading: false });
};

// 获取页面详情
export const getPageDetail = (id: number) => {
  return request.get(`/page/detail/${id}`);
};

// 复制页面数据
export const copyPageData = (params: PageReqParams) => {
  return request.post('/page/copy', params);
};

// 删除页面数据
export const delPageData = (params: { id: number }) => {
  return request.post('/page/delete', params);
};

// 创建页面数据
export const createPageData = (params: CreatePageParams) => {
  return request.post('/page/create', params);
};

// 图片上传
export const uploadImg = (params: any) => {
  return request.post('/upload/files', params, { showLoading: false });
};

// 保存页面数据
export const updatePageData = (params: any) => {
  return request.post('/page/update', params, { showLoading: false });
};

// 发布
export const publishPage = (params: PublishPageParams) => {
  return request.post('/publish/create', params, { showLoading: false });
};

// 发布记录
export const publishList = (params: PublishListParams) => {
  return request.post('/publish/list', params, { showLoading: false });
};

// 页面回滚
export const rollbackPage = (params: { page_id: number; env: string; last_publish_id: number }) => {
  return request.post('/page/rollback', params);
};

// 获取项目列表
export const getProjectList = (params: ProjectListParams) => {
  return request.get('/project/list', params, { showLoading: false });
};

// 新增项目
export const addProject = (params: ProjectCreateParams) => {
  return request.post('/project/create', params, { showLoading: false });
};

// 删除项目
export const delProject = (params: { id: number }) => {
  return request.post('/project/delete', params, { showLoading: false });
};

// 获取项目详情
export const getProjectDetail = (id: number) => {
  return request.get(`/project/detail/${id}`, {}, { showLoading: false });
};

// 更新项目
export const updateProject = (params: ProjectUpdateParams) => {
  return request.post('/project/update', params, { showLoading: false });
};

// 获取菜单列表
export const getMenuList = (params: Menu.SearchParams) => {
  return request.post('/menu/list', params, { showLoading: false });
};

// 新增菜单
export const addMenu = (params: Menu.CreateParams) => {
  return request.post('/menu/create', params, { showLoading: false });
};

// 删除菜单
export const delMenu = (params: { id: number }) => {
  return request.post('/menu/delete', params, { showLoading: false });
};

// 更新菜单
export const updateMenu = (params: Menu.EditParams) => {
  return request.post('/menu/update', params, { showLoading: false });
};

// 更新菜单
export const copyMenu = (params: { id: number }) => {
  return request.post('/menu/copy', params, { showLoading: false });
};

// 获取项目配置的用户列表
export const getUserList = (params: UserListParams) => {
  return request.get('/project/user/list', params, { showLoading: false });
};

// 新增项目用户
export const addUser = (params: UserCreateParams) => {
  return request.post('/project/user/create', params, { showLoading: false });
};

// 删除项目用户
export const delUser = (params: { id: number }) => {
  return request.post('/project/user/delete', params, { showLoading: false });
};

// 更新项目用户
export const updateUser = (params: { id: number; system_role: number; role_id: number }) => {
  return request.post('/project/user/update', params, { showLoading: false });
};

// 获取角色列表
export const getRoleList = (params: Role.Params) => {
  return request.get('/role/list', params, { showLoading: false });
};

// 获取所有角色
export const getRoleListAll = (project_id: number) => {
  return request.get('/role/listAll', { project_id }, { showLoading: false });
};

// 新增角色
export const createRole = (params: Role.CreateParams) => {
  return request.post('/role/create', params, { showLoading: false });
};

// 删除角色
export const delRoleById = (params: { id: number; project_id: number }) => {
  return request.post('/role/delete', params, { showLoading: false });
};

// 更新角色
export const updateRoleLimits = (params: { id: number; checked: string; half_checked: string }) => {
  return request.post('/role/updateLimits', params, { showLoading: false });
};

// 更新角色权限
export const updateRole = (params: { id: number; project_id: string; name: string; remark: string }) => {
  return request.post('/role/update', params, { showLoading: false });
};
