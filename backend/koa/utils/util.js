const jwt = require('jsonwebtoken');
const sdk = require('@baiducloud/sdk');
const config = require('../config');
/**
 * 工具函数
 */
module.exports = {
  /**
   * 接口成功输出
   * @param {*} ctx 上下文对象
   * @param {*} data 返回结果
   * @param {*} code 返回状态码
   */
  success(ctx, data = '', code = 0) {
    ctx.body = {
      code,
      data,
      message: 'success',
    };
  },
  /**
   * 接口失败输出
   * @param {*} ctx 上下文对象
   * @param {*} message 返回信息
   * @param {*} code 返回状态码
   */
  fail(ctx, message = '', code = -1, data = '') {
    ctx.body = {
      code,
      data,
      message,
    };
  },
  /**
   * 判断是否为空
   * @param {*} val 判断值
   * @returns
   */
  isNotEmpty(val) {
    if (val === undefined || val == null || val === '') {
      return false;
    } else if (typeof val === 'string') {
      if (val.trim() === '') {
        return false;
      } else {
        return true;
      }
    } else {
      return true;
    }
  },
  /**
   * 判断是否为数字
   * @param {*} val 判断值
   * @returns
   */
  isNumber(val) {
    const isTrue = this.isNotEmpty(val);
    return isTrue && (typeof val === 'number' || isNaN(val) === false);
  },
  /**
   * 验证环境是否合法
   * @param {*} env 环境名称
   * @returns
   */
  checkEnv(env) {
    if (['stg', 'pre', 'prd'].includes(env)) {
      return true;
    }
    return false;
  },
  /**
   * 获取cookie
   * @param {*} ctx 上下文对象
   * @param {*} name cookie名称
   * @returns
   */
  getCookie(ctx, name) {
    return ctx.cookies.get(name);
  },
  /**
   * 生成jwt-token
   * @param {*} payload 参数对象
   * @returns jwt-token
   */
  createToken(payload) {
    return jwt.sign(payload, config.JWT_SECRET, {
      expiresIn: config.JWT_EXPIRES_IN,
    });
  },
  /**
   * 解密jwt-token
   * @param {*} ctx 上下文对象
   * @returns 解密后对象
   */
  decodeToken(ctx) {
    try {
      let [, authorization] = (ctx.request.headers?.authorization || '').split(' ');
      if (!authorization) {
        return ctx.throw(400, '账号信息异常，请重新登录');
      }
      return jwt.verify(authorization, config.JWT_SECRET);
    } catch (error) {
      return ctx.throw(401, '账号信息异常，请重新登录');
    }
  },
  /**
   * 上传文件，用于自定义组件内容上传到bos
   * @param {*} fileName 文件名称
   * @param {*} content 文件内容
   * @returns 上传后云地址
   */
  async uploadString(fileName, content) {
    var ossConfig = {
      credentials: {
        ak: config.OSS_ACCESSKEY,
        sk: config.OSS_ACCESSKEYSECRET,
      },
      endpoint: config.OSS_ENDPOINT,
    };

    let bucket = config.OSS_BUCKET1;
    let object = `libs/${fileName}`;
    let client = new sdk.BosClient(ossConfig);

    let ContentType = '';
    if (fileName.endsWith('.js')) {
      ContentType = 'application/javascript; charset=utf-8';
    } else if (fileName.endsWith('.html')) {
      ContentType = 'text/html; charset=utf-8';
    } else if (fileName.endsWith('.json')) {
      ContentType = 'application/json; charset=utf-8';
    } else if (fileName.endsWith('.css')) {
      ContentType = 'text/css; charset=utf-8';
    }
    // 以字符串形式上传
    return await client.putObject(bucket, object, Buffer.from(content, 'utf8'), {
      'Content-Type': ContentType, // 添加http header
      'Cache-Control': 'public, max-age=31536000', // 指定缓存指令
      'x-bce-storage-class': 'COLD', // 指定存储类型
      'x-bce-acl': 'public-read',
    });
  },
};
