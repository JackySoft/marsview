import request from '@/utils/request';
import { PageParams, PageReqParams, CreatePageParams, PublishPageParams, PublishListParams } from './types';
export default {
  // 获取页面列表
  getPageList(params: PageParams) {
    return request.get('/page/list', params);
  },

  // 获取页面模板列表
  getPageTemplateList(params: Omit<PageParams, 'type'>) {
    return request.get('/page/getPageTemplateList', params);
  },
  // 获取页面详情
  getPageDetail(id: number) {
    return request.get(`/page/detail/${id}`);
  },

  // 复制页面数据
  copyPageData(params: PageReqParams) {
    return request.post('/page/copy', params);
  },

  // 删除页面数据
  delPageData(params: { id: number }) {
    return request.post('/page/delete', params);
  },

  // 创建页面数据
  createPageData(params: CreatePageParams) {
    return request.post('/page/create', params);
  },

  // 保存页面数据
  updatePageData(params: any) {
    return request.post('/page/update', params);
  },

  // 发布
  publishPage(params: PublishPageParams) {
    return request.post('/publish/create', params);
  },

  // 发布记录
  publishList(params: PublishListParams) {
    return request.post('/publish/list', params);
  },

  // 页面回滚
  rollbackPage(params: { pageId: number; env: string; lastPublishId: number }) {
    return request.post('/page/rollback', params);
  },
};
