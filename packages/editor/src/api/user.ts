import request from '@/utils/request';
import Mock from 'mockjs';
// 用户登录
export const login = async <T>(params: T) => {
  return request.post('/user/login', params);
};

// 获取用户信息
export const getUserInfo = async () => {
  return request.get('/user/info', {});
};

// 搜索用户
export const searchUser = (keyword: string) => {
  return request.post(`/user/search`, { keyword });
};
