const Router = require('@koa/router');
const router = new Router({ prefix: '/api/page' });
const pagesController = require('../controller/pages.controller');

/**
 * 页面服务API接口
 */

// 获取页面列表
router.get('/list', pagesController.list);

// 获取页面模板列表
router.get('/getPageTemplateList', pagesController.listPageTemplate);

// 获取页面详情
router.get('/detail/:id', pagesController.detail);

// 复制页面
router.post('/copy', pagesController.copy);

// 删除页面
router.post('/delete', pagesController.delete);

// 创建页面
router.post('/create', pagesController.create);

// 更新页面
router.post('/update', pagesController.update);

// 页面或项目添加成员
router.post('/role/add', pagesController.roleAdd);

// 页面或项目删除成员
router.post('/role/delete', pagesController.roleDelete);

// 获取页面成员列表
router.post('/role/list', pagesController.roleList);

// 页面回滚
router.post('/rollback', pagesController.rollback);

module.exports = router;
