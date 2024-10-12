const aiService = require('../service/ai/ai.service.js');
const util = require('../utils/util');

module.exports = {
  async codeGenerate(ctx) {
    const { message } = ctx.request.body;
    if (!message) {
      return util.fail(ctx, '请输入提示词');
    }
    try {
      const result = await aiService.codeGenerate(message);
      util.success(ctx, {
        jsx: result[0],
        config: result[1],
      });
    } catch (error) {
      util.fail(ctx, error);
    }
  },
};
