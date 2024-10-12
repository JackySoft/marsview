const Router = require('@koa/router');
const menuController = require('../controller/menu.controller');
const router = new Router({ prefix: '/api/menu' });

/**
 * 菜单管理API接口
 */

// 菜单列表
router.post('/list', menuController.list);

// 创建菜单
router.post('/create', menuController.create);

// 删除菜单
router.post('/delete', menuController.delete);

// 更新菜单
router.post('/update', menuController.update);

// 复制菜单
router.post('/copy', menuController.copy);

module.exports = router;
