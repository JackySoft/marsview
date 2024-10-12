const { InMemoryChatMessageHistory } = require("@langchain/core/chat_history");
const { BaseMessage, MessageContent } = require("@langchain/core/messages");
const {
  ChatPromptTemplate,
  HumanMessagePromptTemplate,
  MessagesPlaceholder,
} = require("@langchain/core/prompts");
const {
  Runnable,
  RunnableWithMessageHistory,
} = require("@langchain/core/runnables");
const { z } = require("zod");

class BaseModelProvider {
  static sessionIdHistoriesMap = {};

  static answerContentToText(content) {
    if (typeof content === "string") {
      return content;
    }

    return content
      .map((c) => {
        if (c.type === "text") {
          return c.text;
        }
        return "";
      })
      .join("");
  }

  async getModel() {
    if (!this.model) {
      this.model = await this.createModel();
    }
    return this.model;
  }

  createPrompt(options) {
    const { useHistory = true } = options ?? {};
    const prompt = ChatPromptTemplate.fromMessages(
      [
        useHistory ? new MessagesPlaceholder("history") : "",
        HumanMessagePromptTemplate.fromTemplate("{input}"),
      ].filter(Boolean)
    );
    return prompt;
  }

  async getHistory(sessionId, appendHistoryMessages) {
    if (BaseModelProvider.sessionIdHistoriesMap[sessionId] === undefined) {
      const messageHistory = new InMemoryChatMessageHistory();

      if (appendHistoryMessages && appendHistoryMessages.length > 0) {
        await messageHistory.addMessages(appendHistoryMessages);
      }

      BaseModelProvider.sessionIdHistoriesMap[sessionId] = messageHistory;
    }
    return BaseModelProvider.sessionIdHistoriesMap[sessionId];
  }

  createRunnableWithMessageHistory(chain, historyMessages) {
    return new RunnableWithMessageHistory({
      runnable: chain,
      getMessageHistory: async (sessionId) =>
        await this.getHistory(sessionId, historyMessages),
      inputMessagesKey: "input",
      historyMessagesKey: "history",
    });
  }

  async createRunnable(options) {
    const { useHistory = true, historyMessages = [], signal } = options ?? {};
    const model = await this.getModel();
    const prompt = await this.createPrompt({ useHistory });
    const chain = prompt.pipe(signal ? model.bind({ signal }) : model);
    return useHistory
      ? await this.createRunnableWithMessageHistory(
          chain,
          historyMessages || []
        )
      : chain;
  }

  async createStructuredOutputRunnable(options) {
    const {
      useHistory = true,
      historyMessages = [],
      zodSchema,
    } = options ?? {};
    const model = await this.getModel();
    const prompt = await this.createPrompt({ useHistory });
    const chain = prompt.pipe(model);
    return useHistory
      ? await this.createRunnableWithMessageHistory(
          chain,
          historyMessages || []
        )
      : chain;
  }
}

module.exports = {
  BaseModelProvider,
};
