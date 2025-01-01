import request from '@/utils/request';

/**
 * 页面和项目成员接口定义
 */
export default {
  getMemberList(params: { pageId: number }) {
    return request.post('/pages/role/list', params);
  },
  addPageMember(params: any) {
    return request.post('/pages/role/add', params);
  },
  deletePageMember(params: any) {
    return request.post('/pages/role/delete', params);
  },
};
