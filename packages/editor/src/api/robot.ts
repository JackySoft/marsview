import request from '@/utils/request';

/**
 * 对接飞书机器人
 */

// 获取机器人所在群组
export const getChatGroups = () => {
  return request.get('/robot/chat/groups');
};
