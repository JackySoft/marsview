const Router = require('@koa/router');
const lark = require('@larksuiteoapi/node-sdk');
const config = require('../config');
const request = require('../utils/request');
const util = require('../utils/util');
const router = new Router({ prefix: '/api/robot' });

const client = new lark.Client({
  appId: config.FEISHU_APP_ID,
  appSecret: config.FEISHU_APP_SECRET,
  disableTokenCache: true,
});

/**
 * 飞书机器人服务接口
 * 主要用于发送飞书消息、创建知识库
 */

// 获取租户token
async function getTenantToken() {
  try {
    if (!config.FEISHU_APP_ID || !config.FEISHU_APP_SECRET) return '';
    const response = await request.post(
      'https://open.feishu.cn/open-apis/auth/v3/tenant_access_token/internal',
      JSON.stringify({
        app_id: config.FEISHU_APP_ID,
        app_secret: config.FEISHU_APP_SECRET,
      }),
    );
    const res = JSON.parse(response.data);
    if (res.code !== 0) return '';
    return res.tenant_access_token;
  } catch (error) {
    return '';
  }
}

// 获取租户token
router.get('/getTenantToken', async (ctx) => {
  const token = await getTenantToken();
  if (!token) return util.fail(ctx, '获取飞书token失败');
  util.success(ctx, { token });
});

// 发送卡片消息
router.post('/sendMessage', async (ctx) => {
  const token = await getTenantToken();
  if (!token) return util.fail(ctx, '获取飞书token失败');

  const { msg_type, content, receive_id, template_id, variables } = ctx.request.body;

  if (!msg_type || (msg_type !== 'text' && msg_type !== 'interactive')) {
    return ctx.throw(400, '消息类型错误，仅支持text和interactive');
  }
  if (msg_type === 'text') {
    if (!content) return ctx.throw(400, '发送内容不能为空');
  } else {
    if (!template_id) {
      return ctx.throw(400, '发送模板不能为空');
    }
  }
  if (!receive_id) {
    return ctx.throw(400, '接收群组ID不能为空');
  }

  if (msg_type === 'text') {
    const res = await client.im.message.create(
      {
        params: {
          receive_id_type: 'chat_id',
        },
        data: {
          receive_id,
          content: JSON.stringify({ text: content }),
          msg_type: 'text',
        },
      },
      lark.withTenantToken(token),
    );
    if (res.code === 0) {
      util.success(ctx, '发送成功');
    } else {
      util.fail(ctx, res.msg);
    }
  } else {
    const res = await client.im.message.createByCard(
      {
        params: {
          receive_id_type: 'chat_id', //chat_id
        },
        data: {
          receive_id,
          msg_type,
          template_id,
          template_variable: variables || {},
        },
      },
      lark.withTenantToken(token),
    );
    if (res.code === 0) {
      util.success(ctx, '发送成功');
    } else {
      util.fail(ctx, res.msg);
    }
  }
});

// 获取机器人所在群列表
router.get('/chat/groups', async (ctx) => {
  const token = await getTenantToken();
  if (!token) return util.fail(ctx, '获取飞书token失败');
  try {
    const response = await request.get('https://open.feishu.cn/open-apis/im/v1/chats', '', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const res = JSON.parse(response.data);
    if (res.code === 0) {
      util.success(ctx, res.data);
    } else {
      util.fail(ctx, res.msg);
    }
  } catch (error) {
    util.fail(ctx, error);
  }
});

// 创建知识库副本
router.post('/createNode', async (ctx) => {
  const token = await getTenantToken();
  if (!token) return util.fail(ctx, '获取飞书token失败');
  const { space_id, node_token, title } = ctx.request.body;

  if (!space_id || isNaN(space_id) || !node_token) {
    return ctx.throw(400, '空间ID或节点token不能为空');
  }
  if (!title) {
    return ctx.throw(400, '知识库标题不能为空');
  }
  try {
    const response = await request.post(
      `https://open.feishu.cn/open-apis/wiki/v2/spaces/${space_id}/nodes/${node_token}/copy`,
      JSON.stringify({
        target_space_id: parseInt(space_id),
        target_parent_token: node_token,
        title,
      }),
      {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      },
    );
    const res = JSON.parse(response.data);
    if (res.code === 0) {
      util.success(ctx, res.data);
    } else {
      util.fail(ctx, res.msg);
    }
  } catch (error) {
    util.fail(ctx, error);
  }
});

module.exports = router;
