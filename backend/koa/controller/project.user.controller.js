const userService = require('../service/project.user.service');
const util = require('../utils/util');
module.exports = {
  // 用户列表
  async list(ctx) {
    const { project_id, user_name = null, pageNum, pageSize } = ctx.request.query;
    if (!project_id || project_id == 0) {
      return ctx.throw(400, '项目ID不能为空');
    }
    const list = await userService.list(project_id, user_name, pageNum, pageSize);
    const { total } = await userService.listCount(project_id, user_name);

    util.success(ctx, {
      list,
      total,
      pageSize: +pageSize,
      pageNum: +pageNum,
    });
  },
  // 用户创建
  async create(ctx) {
    const params = ctx.request.body;
    if (!params.project_id) {
      return ctx.throw(400, '项目ID不能为空');
    }

    if (!params.user_id || !params.user_name) {
      return ctx.throw(400, '用户ID和用户名不能为空');
    }

    // 1：管理员， 2：普通用户，如果是普通用户，必须传入角色id
    if (!params.system_role || params.system_role > 9) {
      return ctx.throw(400, '系统角色不能为空');
    }

    // 如果是普通用户，必须传入角色id
    if (params.system_role == 2 && !params.role_id) {
      return ctx.throw(400, '用户角色不能为空');
    }

    if (params.system_role == 1) {
      params.role_id = 0;
    }

    const user = await userService.getUserRole(params.user_id, params.project_id);
    if (user) {
      return ctx.throw(400, '该用户已存在');
    }
    await userService.createUser(params);
    util.success(ctx);
  },

  // 用户删除
  async delete(ctx) {
    const { id } = ctx.request.body;
    if (!util.isNumber(id)) {
      return ctx.throw(400, '用户ID不能为空');
    }
    await userService.deleteUser(id);
    util.success(ctx);
  },

  // 用户更新
  async update(ctx) {
    const params = ctx.request.body;
    if (!util.isNumber(params.id)) {
      return ctx.throw(400, '用户ID不能为空');
    }

    if (!params.system_role) {
      return ctx.throw(400, '系统角色不能为空');
    }

    // 1：管理员， 2：普通用户，如果是普通用户，必须传入角色id
    if (params.system_role == 2 && !params.role_id) {
      return ctx.throw(400, '用户角色不能为空');
    }
    if (params.system_role == 1) {
      params.role_id = 0;
    }
    await userService.updateUser(params);
    util.success(ctx);
  },

  // 用户详情
  async detail(ctx) {
    const { id } = ctx.request.query;
    if (!util.isNumber(id)) {
      return ctx.throw(400, '用户ID不能为空');
    }
    const userInfo = await userService.detail(+id);
    util.success(ctx, userInfo);
  },
};
