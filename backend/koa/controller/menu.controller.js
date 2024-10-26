const menuService = require('../service/menu.service');
const pageService = require('../service/pages.service');
const util = require('../utils/util');
module.exports = {
  async list(ctx) {
    const { name, status, project_id } = ctx.request.body;
    if (!util.isNumber(project_id)) {
      return ctx.throw(400, 'project_id不合法');
    }
    const list = await menuService.list(name, status, project_id);
    util.success(ctx, { list });
  },
  async create(ctx) {
    const { userId, userName } = util.decodeToken(ctx);
    const { project_id, name, type, is_create } = ctx.request.body;

    if (project_id === 0) {
      return ctx.throw(400, '请先创建项目');
    }
    if (!util.isNumber(project_id)) {
      return ctx.throw(400, 'project_id不合法');
    }

    if (!name) {
      return ctx.throw(400, '菜单名称不能为空');
    }

    try {
      let pageId = 0;
      // 只有菜单和页面类型支持自动创建页面
      if (type !== 2 && is_create === 1) {
        const res = await pageService.createPage(name, userId, userName, '', '', 1, 2, project_id);
        pageId = res.insertId || 0;
      }

      await menuService.create({ ...ctx.request.body, page_id: pageId, userId, userName });
      util.success(ctx);
    } catch (error) {
      util.fail(ctx, error.message);
    }
  },

  async delete(ctx) {
    const { id } = ctx.request.body;
    if (!util.isNotEmpty(id)) {
      return ctx.throw(400, '菜单ID不能为空');
    }
    await menuService.recursionDeleteMenuById(id);
    util.success(ctx);
  },

  async update(ctx) {
    const { id, name } = ctx.request.body;

    if (!util.isNotEmpty(id)) {
      return ctx.throw(400, '菜单ID不能为空');
    }

    if (!name) {
      return ctx.throw(400, '菜单名称不能为空');
    }

    await menuService.update(ctx.request.body);

    util.success(ctx);
  },

  async copy(ctx) {
    const { userId, userName } = util.decodeToken(ctx);
    const { id } = ctx.request.body;

    if (!util.isNotEmpty(id)) {
      return ctx.throw(400, '菜单ID不能为空');
    }

    const [menuInfo] = await menuService.getMenuInfoById(id);

    if (!menuInfo) {
      return ctx.throw(400, '菜单ID不存在');
    }

    await menuService.create({
      ...menuInfo,
      name: `${menuInfo.name}-副本`,
      userId,
      userName,
    });
    util.success(ctx);
  },
};
