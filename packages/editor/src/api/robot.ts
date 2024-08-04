import request from '@/utils/request';

// 获取机器人所在群组
export const getChatGroups = () => {
  return request.get('/robot/chat/groups');
};
