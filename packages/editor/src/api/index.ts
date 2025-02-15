// 获取菜单列表
export const getMenuList = async (params: any) => {
  return {
    list: [
      {
        id: 1,
        projectId: 100000,
        name: '用户管理',
        type: 1,
        icon: 'UngroupOutlined',
        status: 1,
        userId: 100000,
        userName: 'Marsview',
        updatedAt: new Date().toLocaleString(),
        createdAt: new Date().toLocaleString(),
      },
      {
        id: 2,
        projectId: 100000,
        name: '数据看板',
        type: 1,
        icon: 'DashboardOutlined',
        path: '/dashboard',
        pageId: 100000,
        sortNum: 1,
        status: 1,
        userId: 100000,
        userName: 'Marsview',
        updatedAt: new Date().toLocaleString(),
        createdAt: new Date().toLocaleString(),
      },
    ],
  };
};

// 新增菜单
export const addMenu = async (params: any) => {
  return '';
};

// 删除菜单
export const delMenu = async (params: any) => {
  return '';
};

// 更新菜单
export const updateMenu = async (params: any) => {
  return '';
};

// 复制菜单
export const copyMenu = async (params: any) => {
  return '';
};

// 获取项目配置的用户列表
export const getUserList = async (params: any) => {
  return {
    total: 0,
    list: [],
  };
};

// 新增项目用户
export const addUser = async (params: any) => {
  return '';
};

// 删除项目用户
export const delUser = async (params: any) => {
  return '';
};

// 更新项目用户
export const updateUser = async (params: any) => {
  return '';
};

// 获取角色列表
export const getRoleList = (params: any) => {
  return {
    total: 0,
    list: [],
  };
};

// 获取所有角色
export const getRoleListAll = (params: any) => {
  return [];
};

// 新增角色
export const createRole = (params: any) => {
  return '';
};

// 删除角色
export const delRoleById = (params: any) => {
  return '';
};

// 更新角色
export const updateRoleLimits = (params: any) => {
  return '';
};

// 更新角色权限
export const updateRole = (params: any) => {
  return '';
};
