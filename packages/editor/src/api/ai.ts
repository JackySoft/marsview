import request from '@/utils/request';
import { AIChat } from './types';

// 通过message获取代码
export const generateCode = (params: AIChat.AILibChatProps) => {
  return request.post('/ai/lib/chat', params, { timeout: 50000 });
};
