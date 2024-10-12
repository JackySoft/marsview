const Router = require('@koa/router');
const router = new Router({ prefix: '/api/firefly' });
const util = require('../utils/util');
const fireflyService = require('../service/firefly.service');

/**
 * mock服务接口
 * 此接口主要用于线上展示CRUD功能
 */

/**
 * 数据列表
 */
router.get('/list', async (ctx) => {
  const { pageNum, pageSize, name, status } = ctx.request.query;
  if (!pageNum || !pageSize) {
    util.fail(ctx, '分页参数不能为空');
    return;
  }
  if (!util.isNumber(pageNum) || !util.isNumber(pageSize)) {
    util.fail(ctx, '分页参数格式错误');
    return;
  }
  const list = await fireflyService.list(pageNum, pageSize, name, status);
  const { total } = await fireflyService.listCount(name, status);

  util.success(ctx, {
    list,
    total,
    pageSize: +pageSize,
    pageNum: +pageNum,
  });
});

/**
 * 删除数据
 */
router.post('/delete', async (ctx) => {
  const { id } = ctx.request.query;
  if (!id || !util.isNumber(id)) {
    util.fail(ctx, 'ID参数错误');
    return;
  }
  await fireflyService.deleteById(id);
  util.success(ctx, '删除成功');
});

/**
 * 新增数据
 */
router.post('/create', async (ctx) => {
  const { name, type, avatar, time, skill, sales, status, area } = ctx.request.body;
  console.log('skill', skill);
  if (!name) {
    util.fail(ctx, 'name参数不能为空');
    return;
  }
  if (!type) {
    util.fail(ctx, 'type参数不能为空');
    return;
  }
  if (!time) {
    util.fail(ctx, 'time参数不能为空');
    return;
  }
  if (!skill || skill.length === 0) {
    util.fail(ctx, 'skill参数不能为空');
    return;
  }
  if (!sales) {
    util.fail(ctx, 'sales参数不能为空');
    return;
  }
  if (!status) {
    util.fail(ctx, 'status参数不能为空');
    return;
  }
  if (!area) {
    util.fail(ctx, 'area参数不能为空');
    return;
  }

  await fireflyService.create({ ...ctx.request.body, skill: skill.join(',') });
  util.success(ctx, '新增成功');
});

module.exports = router;
