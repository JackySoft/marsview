import request from './../utils/request';

// 图片上传
export const uploadImg = (params: any) => {
  return request.post('http://mars-api.marsview.cc/api/upload/files', params, { 'Content-Type': 'multipart/form-data' });
};
