const Router = require('@koa/router');
const userController = require('../controller/project.user.controller');
const router = new Router({ prefix: '/api/project/user' });

/**
 * 项目添加开发者服务API接口
 */

// 用户列表
router.get('/list', userController.list);

// 用户创建
router.post('/create', userController.create);

// 用户删除
router.post('/delete', userController.delete);

// 用户更新
router.post('/update', userController.update);

// 用户详情
router.get('/detail', userController.detail);

module.exports = router;
