const rolesService = require('../service/roles.service');
const util = require('../utils/util');
module.exports = {
  async list(ctx) {
    const { project_id, name = null, pageNum = 1, pageSize = 10 } = ctx.request.query;

    if (!project_id) {
      return ctx.throw(400, '项目ID不能为空');
    }
    const list = await rolesService.list(project_id, name, pageNum, pageSize);
    const { total } = await rolesService.listCount(project_id, name);

    util.success(ctx, {
      list,
      total,
      pageSize: +pageSize,
      pageNum: +pageNum,
    });
  },

  async listAll(ctx) {
    const { project_id } = ctx.request.query;
    if (!project_id || project_id == '0') {
      return ctx.throw(400, '项目ID不能为空');
    }
    const list = await rolesService.listAll(project_id);
    util.success(ctx, list);
  },

  async create(ctx) {
    const { project_id, name, remark } = ctx.request.body;
    if (!name) {
      return ctx.throw(400, '角色名称不能为空');
    }

    if (project_id == '0' || !project_id) {
      return ctx.throw(400, '请先创建项目');
    }

    if (!util.isNumber(project_id)) {
      return ctx.throw(400, 'project_id不合法');
    }

    const { userId, userName } = util.decodeToken(ctx);

    await rolesService.create(project_id, name, remark, userId, userName);
    util.success(ctx);
  },

  async delete(ctx) {
    const { id, project_id } = ctx.request.body;
    if (!id) {
      return ctx.throw(400, '角色ID不能为空');
    }

    if (!project_id) {
      return ctx.throw(400, '项目ID不能为空');
    }
    await rolesService.delete(id, project_id);
    util.success(ctx);
  },

  async update(ctx) {
    const { id, project_id, name, remark } = ctx.request.body;
    if (!id) {
      return ctx.throw(400, '角色ID不能为空');
    }

    if (!project_id) {
      return ctx.throw(400, '项目ID不能为空');
    }
    await rolesService.update(id, project_id, name, remark);
    util.success(ctx);
  },

  async updateLimits(ctx) {
    const { id, project_id, checked = '', half_checked = '' } = ctx.request.body;
    if (!id) {
      return ctx.throw(400, '角色ID不能为空');
    }

    if (!project_id) {
      return ctx.throw(400, '项目ID不能为空');
    }
    await rolesService.updateLimits(id, project_id, checked, half_checked);
    util.success(ctx);
  },
};
