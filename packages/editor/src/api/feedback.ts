import request from '@/utils/request';

/**
 * 反馈
 */
export interface FeedbackItem {
  id: number;
  userId?: number;
  title: string;
  content: string;
  isSolve?: number;
  isTop?: number;
  like?: number;
  userAvatar?: string;
  createdAt: string;
  nickName: string;
  type: number;
  images?: string;
  issuelUrl?: string;
}

export interface FeedbackCommentItem {
  id: number;
  userAvatar?: string;
  nickName: string;
  content: string;
  createdAt: string;
  feedbackId: number;
  isTop?: number;
}
/**
 * 反馈接口
 */
export default {
  // 发布反馈
  createFeedback(params: { title: string; content: string; type: number; images: string }) {
    return request.post('/feedback/create', params);
  },
  // 获取反馈列表
  getFeedbackList(params: { pageNum: number; pageSize: number; title: string; type: number }) {
    return request.get('/feedback/list', params);
  },
  getFeedbackDetail(id: number) {
    return request.get('/feedback/detail', { id });
  },
  createFeedbackComment(params: { feedbackId: number; content: string }) {
    return request.post('/feedback/createComment', params);
  },
  getFeedbackComments(feedbackId: number, pageSize: number, pageNum: number) {
    return request.get('/feedback/getComments', { feedbackId, pageSize, pageNum });
  },
  queryFeedbackTotal() {
    return request.get('/feedback/queryFeedbackTotal');
  },
};
