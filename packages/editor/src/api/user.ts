import request from '@/utils/request';

// 用户登录
export const login = async <T>(params: T) => {
  return request.post('/user/login', params);
};

// 发送验证码
export const sendEmail = async (params: { email: string }) => {
  return request.post('/user/sendEmail', params);
};

// 邮箱注册
export const regist = async (params: { userName: string; code?: number; userPwd: string }) => {
  return request.post('/user/regist', params);
};

// 获取用户信息
export const getUserInfo = async () => {
  return request.get('/user/info', {});
};

// 搜索用户
export const searchUser = (keyword: string) => {
  return request.post(`/user/search`, { keyword });
};
