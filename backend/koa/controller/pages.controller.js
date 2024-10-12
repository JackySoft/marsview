const pageService = require('../service/pages.service');
const pagesRoleService = require('../service/pagesRole.service');
const userService = require('../service/user.service');
const util = require('../utils/util');

module.exports = {
  async list(ctx) {
    const { userId } = util.decodeToken(ctx);
    const { pageNum, pageSize, keyword, type = 1 } = ctx.request.query;
    const { total } = await pageService.listCount(keyword, type, userId);
    if (total == 0) {
      return util.success(ctx, {
        list: [],
        total: 0,
        pageSize: +pageSize || 12,
        pageNum: +pageNum || 1,
      });
    }
    const list = await pageService.list(pageNum || 1, pageSize || 12, keyword, type, userId);

    const pageList = [];
    // 过滤没有权限的数据，防止用户恶意操作
    for (const item of list) {
      if (item.user_id == userId || item.members?.filter((i) => i.user_id == userId).length > 0 || item.is_public == 1) {
        pageList.push(item);
      } else {
        pageList.push({
          name: item.name,
          logo: item.logo,
          remark: item.remark,
          user_name: item.user_name,
          updated_at: item.updated_at,
        });
      }
    }
    util.success(ctx, {
      list: pageList,
      total,
      pageSize: +pageSize,
      pageNum: +pageNum,
    });
  },

  async listPageTemplate(ctx) {
    const { pageNum, pageSize, keyword } = ctx.request.query;
    const { total } = await pageService.listPageTemplateCount(keyword);
    if (total == 0) {
      return util.success(ctx, {
        list: [],
        total: 0,
        pageSize: +pageSize || 12,
        pageNum: +pageNum || 1,
      });
    }
    const list = await pageService.listPageTemplate(pageNum || 1, pageSize || 12, keyword);
    util.success(ctx, {
      list,
      total,
      pageSize: +pageSize,
      pageNum: +pageNum,
    });
  },

  async detail(ctx) {
    const { id } = ctx.request.params;
    if (!util.isNotEmpty(id)) {
      return ctx.throw(400, '页面ID不能为空');
    }
    const [pageInfo] = await pageService.getPageInfoById(+id);
    util.success(ctx, pageInfo || {});
  },

  async copy(ctx) {
    const { id } = ctx.request.body;
    if (!util.isNotEmpty(id)) {
      return ctx.throw(400, '页面ID不能为空');
    }
    const [pageInfo] = await pageService.getPageInfoById(+id);
    if (!pageInfo) {
      return util.fail(ctx, '页面不存在');
    }
    const { userId, userName } = util.decodeToken(ctx);
    const { name, remark, page_data, is_public = 1, is_edit = 1 } = pageInfo;
    await pageService.createPage(name + '-副本', userId, userName, remark, page_data, is_public == 3 ? 1 : is_public, is_edit);
    util.success(ctx);
  },

  async delete(ctx) {
    const { id } = ctx.request.body;
    if (!util.isNotEmpty(id)) {
      return ctx.throw(400, '页面ID不能为空');
    }
    const { userId } = util.decodeToken(ctx);
    const [pageInfo] = await pageService.getPageSimpleById(+id);
    if (!pageInfo || pageInfo.user_id !== userId) {
      return util.fail(ctx, '您暂无权限删除该页面');
    }
    const res = await pageService.deletePage(id, userId);
    await pagesRoleService.deleteByPageId(id);
    if (res.affectedRows > 0) {
      util.success(ctx);
    } else {
      return ctx.throw(400, '当前暂无权限');
    }
  },

  async create(ctx) {
    const { userId, userName } = util.decodeToken(ctx);
    const { name, remark, is_public = 1, is_edit = 1 } = ctx.request.body;
    if (!name) {
      return ctx.throw(400, '页面名称不能为空');
    }

    await pageService.createPage(name, userId, userName, remark, '', is_public, is_edit);
    util.success(ctx);
  },

  async update(ctx) {
    const { id, name, remark = '', page_data, is_public = 1, is_edit = 1, preview_img = '' } = ctx.request.body;
    if (!util.isNotEmpty(id)) {
      return ctx.throw(400, '页面ID不能为空');
    }

    if (!name) {
      return ctx.throw(400, '页面名称不能为空');
    }
    const { userId } = util.decodeToken(ctx);
    const [pageInfo] = await pageService.getPageSimpleById(+id);
    if (!pageInfo) {
      return util.fail(ctx, '当前页面不存在');
    }
    // 只读权限的页面只有创建者才能编辑
    if (pageInfo.is_edit === 2 && pageInfo.user_id !== userId) {
      return util.fail(ctx, '您当前暂无编辑权限');
    }
    // 模板页面只有管理员才能编辑
    if (pageInfo.is_public === 3 && pageInfo.user_id !== userId) {
      return util.fail(ctx, '您当前暂无编辑权限');
    }
    await pageService.updatePageInfo(name, remark, page_data, is_public, is_edit, id, preview_img);
    util.success(ctx);
  },

  // 页面角色 - 成员列表
  async roleList(ctx) {
    const { page_id } = ctx.request.body;
    if (!page_id) {
      return ctx.throw(400, '页面ID不能为空');
    }
    const list = await pagesRoleService.getPagesRoleList(page_id);
    util.success(ctx, { list });
  },

  /**
   * 页面或者项目 - 添加成员
   * page_id: 页面ID或者项目ID，共用同一张表
   */
  async roleAdd(ctx) {
    const { type, page_id, role, user_name } = ctx.request.body;
    if (!type) {
      return ctx.throw(400, '成员类型不能为空');
    }

    if (!page_id || isNaN(+page_id)) {
      return ctx.throw(400, '页面ID或项目ID不能为空');
    }

    if (!role) {
      return ctx.throw(400, '角色不能为空');
    }

    if (!user_name) {
      return ctx.throw(400, '开发者ID或名称不能为空');
    }
    const res = await userService.search(user_name);
    if (!res) {
      return ctx.throw(400, '当前用户不存在');
    }
    await pagesRoleService.create(type, page_id, role, res.id, user_name);
    util.success(ctx);
  },

  // 删除页面成员
  async roleDelete(ctx) {
    const { id } = ctx.request.body;
    if (!util.isNumber(id)) {
      return ctx.throw(400, 'ID不能为空');
    }
    await pagesRoleService.delete(id);
    util.success(ctx);
  },

  // 页面回滚
  async rollback(ctx) {
    const { page_id, last_publish_id, env } = ctx.request.body;
    if (!util.isNotEmpty(page_id)) {
      return ctx.throw(400, '页面ID不能为空');
    }

    if (!util.isNotEmpty(last_publish_id)) {
      return ctx.throw(400, '回滚ID不能为空');
    }

    if (!util.checkEnv(env)) {
      return ctx.throw(400, '环境不能为空');
    }
    await pageService.updateLastPublishId(page_id, last_publish_id, env);
    util.success(ctx);
  },
};
