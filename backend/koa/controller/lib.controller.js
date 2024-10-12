const { v4 } = require('uuid');
const libService = require('../service/lib.service');
const util = require('../utils/util');
const { md5Encry } = require('../utils/sign');
const config = require('../config');

module.exports = {
  async list(ctx) {
    const { userId } = util.decodeToken(ctx);
    const { pageNum = 1, pageSize = 10, keyword = '', type = 1 } = ctx.request.query;
    const { total } = await libService.listCount(keyword, type, userId);
    if (total == 0) {
      return util.success(ctx, {
        list: [],
        total: 0,
        pageSize: +pageSize || 10,
        pageNum: +pageNum || 1,
      });
    }
    const list = await libService.list(pageNum, pageSize, keyword, type, userId);
    util.success(ctx, {
      list,
      total,
      pageSize: +pageSize,
      pageNum: +pageNum,
    });
  },

  async installList(ctx) {
    const { userId } = util.decodeToken(ctx);
    const list = await libService.installList(userId);
    util.success(ctx, list);
  },

  async detail(ctx) {
    const { id } = ctx.request.params;
    if (!util.isNotEmpty(id)) {
      return ctx.throw(400, '组件id不能为空');
    }
    const [result = {}] = await libService.getDetailById(+id);
    if (result.source) {
      const [react_source, less_source, config_source] = result.source.split('>>>>>>>>>>');
      delete result.source;
      result.react_source = react_source;
      result.less_source = less_source;
      result.config_source = config_source;
    }
    util.success(ctx, result);
  },

  async create(ctx) {
    const { tag, name, description = '' } = ctx.request.body;
    const { userId, userName } = util.decodeToken(ctx);
    if (!userId || !userName) {
      return ctx.throw(400, '账号信息异常，请重新登录');
    }
    if (!tag) {
      return ctx.throw(400, '组件标识不能为空');
    }
    if (/^[a-zA-Z]+$/g.test(tag) === false) {
      return ctx.throw(400, '组件标识只支持英文');
    }
    if (!name) {
      return ctx.throw(400, '组件名称不能为空');
    }

    await libService.createLib('MC' + tag, name, description, userId, userName);
    util.success(ctx);
  },

  async delete(ctx) {
    const { id } = ctx.request.params;
    if (!util.isNumber(id)) {
      return ctx.throw(400, '组件id不正确');
    }
    await libService.deleteLibById(id);
    util.success(ctx);
  },

  async update(ctx) {
    const { id, react_code, less_code, config_code, md_code, hash } = ctx.request.body;
    if (!util.isNumber(id)) {
      return ctx.throw(400, '组件id不正确');
    }

    if (!react_code) {
      return ctx.throw(400, '源码不能为空');
    }

    if (!config_code) {
      return ctx.throw(400, '组件配置不能为空');
    }

    await libService.updateLib({
      react_code,
      less_code,
      config_code,
      md_code,
      hash,
      id,
    });
    util.success(ctx);
  },

  async publish(ctx) {
    const { lib_id, react_compile, config_code, css_compile, release_hash } = ctx.request.body;
    if (!util.isNumber(lib_id)) {
      return ctx.throw(400, '组件id不正确');
    }

    if (!react_compile) {
      return ctx.throw(400, 'react代码不能为空');
    }

    if (!config_code) {
      return ctx.throw(400, '组件配置不能为空');
    }

    if (!release_hash) {
      return ctx.throw(400, '缺少hash参数');
    }

    const { userId, userName } = util.decodeToken(ctx);

    const detail = await libService.getPublishByLibId(lib_id);
    if (detail) {
      if (detail && detail.release_hash === release_hash) {
        return ctx.throw(400, '当前已经是最新版本');
      }
      const id = v4();
      const jsName = md5Encry(userId + react_compile + Date.now()) + '.js';
      const cssName = md5Encry(userId + css_compile + Date.now()) + '.css';
      const configName = md5Encry(userId + config_code + Date.now()) + '.js';
      await util.uploadString(jsName, react_compile);
      await util.uploadString(cssName, css_compile);
      await util.uploadString(configName, config_code);
      await libService.updateLibPublish({
        lib_id,
        react_url: `${config.OSS_CDNDOMAIN1}/libs/${jsName}`,
        css_url: `${config.OSS_CDNDOMAIN1}/libs/${cssName}`,
        config_url: `${config.OSS_CDNDOMAIN1}/libs/${configName}`,
        release_hash,
      });
    } else {
      const id = v4();
      const jsName = md5Encry(userId + react_compile + Date.now()) + '.js';
      const cssName = md5Encry(userId + css_compile + Date.now()) + '.css';
      const configName = md5Encry(userId + config_code + Date.now()) + '.js';
      await util.uploadString(jsName, react_compile);
      await util.uploadString(cssName, css_compile);
      await util.uploadString(configName, config_code);
      await libService.publish({
        lib_id,
        release_id: id,
        react_url: `${config.OSS_CDNDOMAIN1}/libs/${jsName}`,
        css_url: `${config.OSS_CDNDOMAIN1}/libs/${cssName}`,
        config_url: `${config.OSS_CDNDOMAIN1}/libs/${configName}`,
        release_hash,
        user_id: userId,
        user_name: userName,
      });
    }

    util.success(ctx);
  },
};
