import request from '@/utils/request';
import { AIChat } from './types';
import { message } from 'antd';

// 通过message获取代码
export const generateCode = (params: AIChat.AILibChatProps) => {
  console.log('message', params.message);
  return request.post('/ai/lib/chat', params, { showLoading: false, timeout: 50000 });
};
