const Router = require('@koa/router');
const router = new Router({ prefix: '/api/workflow' });
const workflow = require('../controller/workflow.controller');

/**
 * 工作流API接口
 */

/**
 * 工作流列表
 */
router.get('/list', workflow.list);

/**
 * 工作流详情
 */
router.get('/detail/:id', workflow.detail);

/**
 * 创建工作流
 */
router.post('/create', workflow.create);

/**
 * 删除工作流
 */
router.post('/delete/:id', workflow.delete);

/**
 * 更新工作流
 */
router.post('/update', workflow.update);

module.exports = router;
