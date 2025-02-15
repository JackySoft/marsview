export default {
  async getCategoryList(params: any) {
    return {
      total: 1,
      list: [
        {
          id: 100001,
          name: 'Marsview',
          remark: '后台管理系统',
          userId: 100000,
          userName: 'Marsview',
          logo: '/imgs/mars-logo.png',
          updatedAt: Date.now(),
        },
      ],
    };
  },

  // 新增项目
  async addProject(params: any) {
    return '';
  },

  // 删除项目
  async delProject(params: any) {
    return '';
  },

  // 获取项目详情
  async getProjectDetail(params: any) {
    return {
      id: 100000,
      name: 'Marsview',
      remark: '后台管理系统',
      logo: '/imgs/mars-logo.png',
      userId: 100000,
      layout: 1,
      menuMode: 'vertical',
      menuThemeColor: 'dark',
      breadcrumb: 1,
      tag: 1,
      footer: 0,
      isPublic: 2,
      userName: 'admin',
    };
  },

  // 更新项目
  async updateProject(params: any) {
    return '';
  },
};
