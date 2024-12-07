import request from '@materials/utils/request';

// 图片上传
export const uploadImg = (params: any) => {
  return request.post(`${import.meta.env.VITE_BASE_API}/upload/files`, params, { headers: { 'Content-Type': 'multipart/form-data' }, isCors: false });
};
