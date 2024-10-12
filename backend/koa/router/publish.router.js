const Router = require('@koa/router');
const router = new Router({ prefix: '/api/publish' });
const publishController = require('../controller/publish.controller');

/**
 * 页面发布服务API接口
 */

// 发布列表
router.post('/list', publishController.list);

// 发布页面
router.post('/create', publishController.create);

module.exports = router;
