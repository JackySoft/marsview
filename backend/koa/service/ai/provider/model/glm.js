const { BaseModelProvider } = require("../base/BaseModelProvider");
const { ChatZhipuAI } = require("@langchain/community/chat_models/zhipuai");

class GlmModelProvider extends BaseModelProvider {
  async createModel() {
    const aiKey = "e971601d428426fc11f7df8fe8f408da.DlQVn8wwPaDw7XPy";
    const model_name = "glm-4";

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
