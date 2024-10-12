const log4js = require('log4js');

/**
 * 日志输出配置，当前暂未使用。
 */
const levels = {
  trace: log4js.levels.TRACE,
  debug: log4js.levels.DEBUG,
  info: log4js.levels.INFO,
  warn: log4js.levels.WARN,
  error: log4js.levels.ERROR,
  fatal: log4js.levels.FATAL,
};
log4js.configure({
  appenders: {
    console: { type: 'console' },
    file: {
      type: 'dateFile',
      filename: 'logs/mars-api',
      pattern: 'yyyy-MM-dd.log',
      alwaysIncludePattern: true, // 设置文件名称为 filename + pattern
    },
  },
  categories: {
    default: { appenders: ['file'], level: 'fatal' },
  },
});

/**
 * 日志输出，level为debug
 * @param {string} content
 */
exports.debug = (content) => {
  let logger = log4js.getLogger();
  logger.debug(content);
};

/**
 * 日志输出，level为info
 * @param {string} content
 */
exports.info = (content) => {
  let logger = log4js.getLogger();
  logger.info(content);
};

/**
 * 日志输出，level为error
 * @param {string} content
 */
exports.error = (content) => {
  let logger = log4js.getLogger();
  logger.error(content);
};
