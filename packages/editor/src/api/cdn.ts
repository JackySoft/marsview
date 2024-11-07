import request from '@/utils/request';

// 获取图片云列表
export const getImgList = async <T>(params: T) => {
  return request.get('/cloud/list', params);
};
