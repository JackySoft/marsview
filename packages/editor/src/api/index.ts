import request from '@/utils/request';

// 获取菜单列表
export const getMenuList = (params: any) => {
  return request.post('/project/menu/list', params);
};

// 新增菜单
export const addMenu = (params: any) => {
  return request.post('/project/menu/create', params);
};

// 删除菜单
export const delMenu = (params: { id: number }) => {
  return request.post('/project/menu/delete', params);
};

// 更新菜单
export const updateMenu = (params: any) => {
  return request.post('/project/menu/update', params);
};

// 复制菜单
export const copyMenu = (params: { id: number }) => {
  return request.post('/project/menu/copy', params);
};

// 获取项目配置的用户列表
export const getUserList = (params: any) => {
  return request.get('/project/user/list', params);
};

// 新增项目用户
export const addUser = (params: any) => {
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
export const getRoleList = (params: any) => {
  return request.get('/project/role/list', params);
};

// 获取所有角色
export const getRoleListAll = (projectId: number) => {
  return request.get('/project/role/listAll', { projectId });
};

// 新增角色
export const createRole = (params: any) => {
  return request.post('/project/role/create', params);
};

// 删除角色
export const delRoleById = (params: any) => {
  return request.post('/project/role/delete', params);
};

// 更新角色
export const updateRoleLimits = (params: any) => {
  return request.post('/project/role/updateLimits', params);
};

// 更新角色权限
export const updateRole = (params: any) => {
  return request.post('/project/role/update', params);
};
