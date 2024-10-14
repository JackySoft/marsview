const Koa = require('koa');
const { koaBody } = require('koa-body');
const cors = require('koa2-cors');
const koajwt = require('koa-jwt');
const path = require('path');
const { routerInstaller } = require('./utils/installer');
const errorHandler = require('./error');
const config = require('./config');
const app = new Koa();
app.use(
  cors({
    credentials: true, // 允许携带认证信息（如cookies）
    exposeHeaders: ['filename'], // 下载文件时，响应头中包含filename
  }),
);

/**
 * 中间件处理
 * 1. Cookie令牌验证。
 * 2. 参数、请求地址打印，通过monitor排查错误日志。
 * 3. 拦截通过throw抛出的异常。
 */
app.use(async (ctx, next) => {
  try {
    await next();
  } catch (err) {
    if (err.name === 'UnauthorizedError') {
      ctx.body = {
        code: 10018,
        data: '',
        message: 'TOKEN 无效，请重新登录', // 自定义错误信息
      };
      return;
    } else if (err.message.indexOf('options.maxFileSize') > -1) {
      ctx.body = {
        code: 102,
        data: '',
        message: '超出最大限制，文件最大为5M', // 自定义错误信息
      };
      return;
    } else {
      ctx.body = {
        code: -1,
        data: '',
        message: err.message,
      };
    }
  }
});

// 文件上传中间件
app.use(
  koaBody({
    multipart: true,
    formidable: {
      uploadDir: path.join(__dirname, 'public/'), // 设置文件上传目录
      keepExtensions: true, // 保持文件的后缀
      allowEmptyFiles: false, // 允许上传空文件
      maxFiles: 1, // 设置同时上传文件的个数
      maxFileSize: 5 * 1024 * 1024, // 文件大小限制，默认2M
      maxFields: 10, // 设置字段数量
      maxFieldsSize: 3 * 1024 * 1024, // 设置上传文件内存大小
    },
  }),
);

// token 鉴权
app.use(
  koajwt({ secret: config.JWT_SECRET }).unless({
    path: [
      /^\/api\/user\/login/,
      /^\/api\/user\/sendEmail/,
      /^\/api\/user\/regist/,
      /^\/api\/admin\/page\/detail/,
      /^\/api\/ai\/proxy/,
      /^\/api\/firefly/,
    ],
  }),
);

routerInstaller(app);

app.on('error', errorHandler);

module.exports = app;
