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

// 获取用户头像
export const getUserAvatar = () => {
  // TODO 等后续接入微信扫码后生成用户头像
  return Promise.resolve({
    avatar: '',
  });
};

// 搜索用户
export const searchUser = (keyword: string) => {
  return request.post(`/user/search`, { keyword });
};

// 密码找回 - 发送邮件
export const createResetLink = (params: { userEmail: string }) => {
  return request.post('/user/password/forget', params);
};

// 密码找回 - 获取用户名
export const getAccountByToken = (token: string) => {
  return request.post(`/user/password/getUserByToken?resetToken=${token}`);
};

// 密码找回提交
export const resetSubmit = (params: { resetToken: string; userPwd: string }) => {
  return request.post('/user/password/reset', params);
};
