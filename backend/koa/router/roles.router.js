const Router = require('@koa/router');
const rolesController = require('../controller/roles.controller');
const router = new Router({ prefix: '/api/role' });

/**
 * 角色服务API接口
 */

// 角色列表
router.get('/list', rolesController.list);

// 所有角色列表
router.get('/listAll', rolesController.listAll);

// 创建角色
router.post('/create', rolesController.create);

// 删除角色
router.post('/delete', rolesController.delete);

// 更新角色
router.post('/update', rolesController.update);

// 更新角色权限
router.post('/updateLimits', rolesController.updateLimits);

module.exports = router;
