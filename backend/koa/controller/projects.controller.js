const projectsService = require('../service/projects.service');
const pagesRoleService = require('../service/pagesRole.service');
const menuService = require('../service/menu.service');
const util = require('../utils/util');

module.exports = {
  async list(ctx) {
    const { userId } = util.decodeToken(ctx);
    const { pageNum, pageSize, keyword, type = 1 } = ctx.request.query;
    const { total } = await projectsService.listCount(keyword, type, userId);
    if (total == 0) {
      return util.success(ctx, {
        list: [],
        total: 0,
        pageSize: +pageSize || 12,
        pageNum: +pageNum || 1,
      });
    }
    const list = await projectsService.list(pageNum || 1, pageSize || 12, keyword, type, userId);

    const projectList = [];
    // 过滤没有权限的数据，防止用户恶意操作
    for (const item of list) {
      if (item.user_id == userId || item.members?.filter((i) => i.user_id == userId).length > 0) {
        projectList.push({
          ...item,
          is_edit: true,
        });
      } else {
        projectList.push({
          // 私有项目，不返回ID
          id: item.is_public == 1 ? item.id : 0,
          name: item.name,
          logo: item.logo,
          remark: item.remark,
          is_public: item.is_public,
          // 不管私有还是公开，没有开发者，一律不可编辑
          is_edit: false,
          user_name: item.user_name,
          updated_at: item.updated_at,
        });
      }
    }
    util.success(ctx, {
      list: projectList,
      total,
      pageSize: +pageSize,
      pageNum: +pageNum,
    });
  },

  async create(ctx) {
    const params = ctx.request.body;
    const { userId, userName } = util.decodeToken(ctx);
    if (!params.name) {
      return ctx.throw(400, '项目名称不能为空');
    }

    if (!params.remark) {
      return ctx.throw(400, '项目描述不能为空');
    }

    if (!params.logo) {
      return ctx.throw(400, '项目logo不能为空');
    }
    await projectsService.createProject({
      ...params,
      user_id: userId,
      user_name: userName,
    });
    util.success(ctx);
  },

  async delete(ctx) {
    const { id } = ctx.request.body;
    if (!util.isNumber(id)) {
      return ctx.throw(400, 'id参数不正确');
    }
    const { userId } = util.decodeToken(ctx);
    const [projectInfo] = await projectsService.getProjectInfoById(+id);
    if (!projectInfo || projectInfo.user_id != userId) {
      return ctx.throw(400, '您暂无权限删除该项目');
    }
    const res = await projectsService.deleteProject(id, userId);
    pagesRoleService.deleteByPageId(id);
    menuService.deleteMenuByProjectId(id);
    if (res.affectedRows > 0) {
      util.success(ctx);
    } else {
      return ctx.throw(400, '当前暂无权限');
    }
  },

  async update(ctx) {
    const { id, name, remark, logo } = ctx.request.body;
    if (!util.isNumber(id)) {
      return ctx.throw(400, 'id参数不正确');
    }
    if (!name) {
      return ctx.throw(400, '项目名称不能为空');
    }
    if (!remark) {
      return ctx.throw(400, '项目描述不能为空');
    }
    if (!logo) {
      return ctx.throw(400, '项目logo不能为空');
    }

    await projectsService.updateProjectInfo(ctx.request.body);
    util.success(ctx);
  },

  async detail(ctx) {
    const { id } = ctx.params;
    if (!util.isNumber(id)) {
      return ctx.throw(400, 'id参数不正确');
    }

    const [projectInfo] = await projectsService.getProjectInfoById(+id);

    if (!projectInfo) {
      return ctx.throw(400, '项目不存在');
    }
    util.success(ctx, projectInfo);
  },
};
