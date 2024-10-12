const Router = require('@koa/router');
const ai = require('../controller/ai.controller');
const router = new Router({ prefix: '/api/ai' });
const request = require('../utils/request');
const util = require('../utils/util');

/**
 * 接口代理和大模型接入API接口
 */

// 项目配置
router.post('/lib/chat', ai.codeGenerate);

// 接口转发(get)
router.get('/proxy', async (ctx) => {
  try {
    const {
      query,
      headers: { host, origin, proxyapi, ...headers },
    } = ctx.request;
    const response = await request.get(proxyapi, query || {}, {
      headers,
    });
    if (response.data) {
      const res = JSON.parse(response.data);
      ctx.body = res;
    } else {
      ctx.body = response.data;
    }
  } catch (error) {
    util.fail(ctx, 500, error.message);
  }
});

// 接口转发(post)
router.post('/proxy', async (ctx) => {
  try {
    const {
      body,
      headers: { host, origin, proxyapi, ...headers },
    } = ctx.request;
    const response = await request.post(proxyapi, JSON.stringify(body || {}), {
      headers,
    });
    if (response.data) {
      const res = JSON.parse(response.data);
      ctx.body = res;
    } else {
      ctx.body = response.data;
    }
  } catch (error) {
    util.fail(ctx, 500, error.message);
  }
});

module.exports = router;
