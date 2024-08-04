import request from '@/utils/request';

/**
 * 页面成员类型定义
 */
export interface AddParams {
  type: 1 | 2;
  page_id: number;
  role: number;
  user_name: string;
}

export interface DelParams {
  id: number;
}
export interface PageMember extends AddParams {
  id: number;
}

export interface PageItem {
  id: number;
  name: string;
  remark: string;
  is_public: number;
}
/**
 * 页面和项目成员接口定义
 */
export default {
  getMemberList(params: { page_id: number }) {
    return request.post('/page/role/list', params, { showLoading: false });
  },
  addPageMember(params: AddParams) {
    return request.post('/page/role/add', params, { showLoading: false });
  },
  deletePageMember(params: DelParams) {
    return request.post('/page/role/delete', params);
  },
  // 获取当前用户页面列表
  getPageList() {
    return request.post('/page/user/pages', {}, { showLoading: false });
  },
};
