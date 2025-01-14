import Mock from 'mockjs';
Mock.mock('/api/user/login', 'post', {
  code: 0,
  data: {
    userId: 100000,
    userName: 'Marsview',
    token: '88888888',
  },
  message: '操作成功',
});
Mock.mock('/api/user/info', 'get', {
  code: 0,
  data: {
    userId: 100000,
    userName: 'Marsview',
    nickName: 'Marsview管理员',
    avatar: 'https://marsview.cdn.bcebos.com/mars-logo.png',
    createdAt: '2025-01-14 12:00:00',
  },
  message: '操作成功',
});
Mock.mock(/\/api\/admin\/project\/list(\?.*)?/, 'get', {
  code: 0,
  data: {
    total: 1,
    list: [
      {
        id: 100000,
        name: 'Marsview',
        remark: '后台管理系统',
        userId: 100000,
        userName: 'Marsview',
        logo: 'https://marsview.cdn.bcebos.com/mars-logo.png',
        updatedAt: Date.now(),
        count: 1,
      },
    ],
  },
  message: '操作成功',
});
Mock.mock(/\/api\/admin\/getProjectConfig(\?.*)?/, 'get', {
  code: 0,
  data: {
    id: 100000,
    name: 'Marsview',
    remark: '后台管理系统',
    logo: 'https://marsview.cdn.bcebos.com/mars-logo.png',
    userId: 100000,
    layout: 1,
    menuMode: 'vertical',
    userName: 'Marsview',
  },
  message: '操作成功',
});
Mock.mock('/api/admin/menu/list/100000', 'get', {
  code: 0,
  data: {
    list: [
      {
        id: 100000,
        projectId: 100000,
        name: '用户管理',
        icon: 'UngroupOutlined',
        path: '/users',
        status: 1,
        type: 1,
        userId: 100000,
      },
      {
        id: 100000,
        projectId: 100000,
        name: '数据看板',
        icon: 'DashboardOutlined',
        path: '/dashboard',
        status: 1,
        type: 1,
        userId: 100000,
      },
    ],
  },
});
Mock.mock(/\/api\/admin\/pages\/detail\/.*/, 'get', {
  code: 0,
  data: {
    id: 100000,
    pageId: 100000,
    pageName: '数据看板',
    pageData: {},
    userId: 100000,
    userName: 'Marsview',
    env: 'stg',
    createdAt: '2025-01-02 18:16:54',
    updatedAt: '2025-01-02 18:16:54',
  },
  message: '操作成功',
});
export default Mock;
