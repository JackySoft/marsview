/**
 * 页面和项目成员接口定义
 */
export default {
  async getMemberList(params: any) {
    return {
      list: [
        {
          id: 1,
          pageId: 100000,
          role: 1,
          userId: 100000,
          userName: 'demo@qq.com',
        },
      ],
    };
  },
  async addPageMember(params: any) {
    return '';
  },
  async deletePageMember(params: any) {
    return '';
  },
};
