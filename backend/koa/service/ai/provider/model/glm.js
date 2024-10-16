const { BaseModelProvider } = require('../base/BaseModelProvider');
const { ChatZhipuAI } = require('@langchain/community/chat_models/zhipuai');
const { ZHIPU_AI_KEY } = require('../../../../config');
class GlmModelProvider extends BaseModelProvider {
  async createModel() {
    const aiKey = ZHIPU_AI_KEY;
    const model_name = 'glm-4';

    const model = new ChatZhipuAI({
      apiKey: aiKey,
      model: model_name,
      temperature: 0.95, // never use 1.0, some models do not support it
      maxRetries: 3,
      verbose: true,
    });

    return model;
  }
}

module.exports = {
  GlmModelProvider,
};
