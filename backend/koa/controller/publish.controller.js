const pagesService = require('../service/pages.service');
const publishService = require('../service/publish.service');
const util = require('../utils/util');
module.exports = {
  async list(ctx) {
    const { env, user_name, start, end, pageNum, pageSize, page_id } = ctx.request.body;
    const list = await publishService.list(ctx.request.body);
    const total = await publishService.listCount(env, user_name, start, end, page_id);
    util.success(ctx, {
      list,
      total,
      pageSize: +pageSize,
      pageNum: +pageNum,
    });
  },

  async create(ctx) {
    const { page_id, env, preview_img } = ctx.request.body;

    if (!util.isNotEmpty(page_id)) {
      return ctx.throw(400, '页面ID不能为空');
    }

    if (!util.isNumber(page_id)) {
      return ctx.throw(400, '页面ID参数错误');
    }

    if (!util.checkEnv(env)) {
      return ctx.throw(400, '发布环境参数错误');
    }

    const { userId, userName } = util.decodeToken(ctx);

    const [pageInfo] = await pagesService.getPageInfoById(+page_id);
    if (!pageInfo || !pageInfo.page_data) {
      return ctx.throw(400, '页面不存在或页面数据为空');
    }
    const result = await publishService.createPublish(page_id, pageInfo.name, pageInfo.page_data, userName, userId, env);

    await pagesService.updatePageState(result.insertId, page_id, env, preview_img);

    util.success(ctx);
  },
};
