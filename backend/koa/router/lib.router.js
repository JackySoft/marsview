const Router = require('@koa/router');
const router = new Router({ prefix: '/api/lib' });
const libController = require('../controller/lib.controller');

/**
 * 自定义组件库API接口
 */

/**
 * 组件库列表
 */
router.get('/list', libController.list);

/**
 * 组件安装列表
 */
router.post('/install/list', libController.installList);

/**
 * 组件库详情
 */
router.get('/detail/:id', libController.detail);

/**
 * 创建组件库
 */
router.post('/create', libController.create);

/**
 * 删除组件库
 */
router.post('/delete/:id', libController.delete);

/**
 * 更新组件库
 */
router.post('/update', libController.update);

/**
 * 发布组件库
 */
router.post('/publish', libController.publish);

module.exports = router;
