const workflow = require('../service/workflow.service');
const util = require('../utils/util');

module.exports = {
  async list(ctx) {
    const { userId } = util.decodeToken(ctx);
    const { pageNum = 1, pageSize = 10, keyword = '' } = ctx.request.query;
    const { total } = await workflow.listCount(keyword, userId);
    if (total == 0) {
      return util.success(ctx, {
        list: [],
        total: 0,
        pageSize: +pageSize || 10,
        pageNum: +pageNum || 1,
      });
    }
    const list = await workflow.list(pageNum, pageSize, keyword, userId);
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
      return ctx.throw(400, '模板id不能为空');
    }
    const { userId } = util.decodeToken(ctx);
    const [result = {}] = await workflow.getDetailById(+id, userId);
    util.success(ctx, result);
  },

  async create(ctx) {
    const { form_name, form_desc } = ctx.request.body;
    const { userId, userName } = util.decodeToken(ctx);
    if (!userId || !userName) {
      return ctx.throw(400, '账号信息异常，请重新登录');
    }
    if (!form_name) {
      return ctx.throw(400, '模板名称不能为空');
    }

    await workflow.createTemplate(form_name, form_desc, userId, userName);
    util.success(ctx);
  },

  async delete(ctx) {
    const { id } = ctx.request.params;
    if (!util.isNumber(id)) {
      return ctx.throw(400, '组件id不正确');
    }
    const { userId } = util.decodeToken(ctx);
    await workflow.deleteTemplateById(id, userId);
    util.success(ctx);
  },

  async update(ctx) {
    const { id, form_name, form_desc, page_id, template_data } = ctx.request.body;
    if (!util.isNumber(id)) {
      return ctx.throw(400, '组件id不正确');
    }

    const { userId } = util.decodeToken(ctx);

    await workflow.updateTemplate(id, form_name, form_desc, page_id, template_data, userId);
    util.success(ctx);
  },
};
