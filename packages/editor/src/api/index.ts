import request from '@/utils/request';
import { UserListParams, UserCreateParams, Menu, Role } from './types';

// 图片上传
export const uploadImg = (params: any) => {
  return request.post('/upload/files', params, { showError: false });
};

// 获取菜单列表
export const getMenuList = (params: Menu.SearchParams) => {
  return request.post('/menu/list', params);
};

// 新增菜单
export const addMenu = (params: Menu.CreateParams) => {
  return request.post('/menu/create', params);
};

// 删除菜单
export const delMenu = (params: { id: number }) => {
  return request.post('/menu/delete', params);
};

// 更新菜单
export const updateMenu = (params: Menu.EditParams) => {
  return request.post('/menu/update', params);
};

// 复制菜单
export const copyMenu = (params: { id: number }) => {
  return request.post('/menu/copy', params);
};

// 获取项目配置的用户列表
export const getUserList = (params: UserListParams) => {
  return request.get('/project/user/list', params);
};

// 新增项目用户
export const addUser = (params: UserCreateParams) => {
  return request.post('/project/user/create', params);
};

// 删除项目用户
export const delUser = (params: { id: number }) => {
  return request.post('/project/user/delete', params);
};

// 更新项目用户
export const updateUser = (params: { id: number; systemRole: number; roleId: number }) => {
  return request.post('/project/user/update', params);
};

// 获取角色列表
export const getRoleList = (params: Role.Params) => {
  return request.get('/role/list', params);
};

// 获取所有角色
export const getRoleListAll = (projectId: number) => {
  return request.get('/role/listAll', { projectId });
};

// 新增角色
export const createRole = (params: Role.CreateParams) => {
  return request.post('/role/create', params);
};

// 删除角色
export const delRoleById = (params: { id: number; projectId: number }) => {
  return request.post('/role/delete', params);
};

// 更新角色
export const updateRoleLimits = (params: { id: number; checked: string; halfChecked: string }) => {
  return request.post('/role/updateLimits', params);
};

// 更新角色权限
export const updateRole = (params: { id: number; projectId: string; name: string; remark: string }) => {
  return request.post('/role/update', params);
};
