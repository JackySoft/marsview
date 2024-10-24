const Router = require('@koa/router');
const fs = require('fs');
const router = new Router({ prefix: '/api/cloud' });
const util = require('../utils/util');
const sdk = require('@baiducloud/sdk');
const imgcloud = require('../service/imgcloud.service');
const config = require('../config');
/**
 * 图片云服务API接口
 */

// 上传cdn文件
router.post('/upload/files', async (ctx) => {
  try {
    const file = ctx.request.files.file;
    const { userId, userName } = util.decodeToken(ctx);
    const { total } = await imgcloud.getTotalByUserId(userId);
    const message = total > 0 && userId == 49 ? 'Demo用户只能上传1个文件' : total > 10 && userId != 50 ? '普通用户最多可以上传10个文件' : '';
    if (message) {
      fs.unlink(file.filepath, (err) => {
        if (err) {
          return;
        }
      });
      return util.fail(ctx, message);
    }
    const ossConfig = {
      endpoint: config.OSS_ENDPOINT, //传入Bucket所在区域域名
      credentials: {
        ak: config.OSS_ACCESSKEY, //您的AccessKey
        sk: config.OSS_ACCESSKEYSECRET, //您的SecretAccessKey
      },
    };
    const buffer = fs.readFileSync(file.filepath);
    let bucket = config.OSS_BUCKET2;
    let key = `${file.newFilename}`;
    let client = new sdk.BosClient(ossConfig);

    await client.putObject(bucket, key, buffer, {
      'Content-Type': file.mimetype, // 添加http header
      'Cache-Control': 'public, max-age=31536000', // 指定缓存指令
      'x-bce-storage-class': 'COLD', // 指定存储类型
      'x-bce-acl': 'public-read',
    });
    // 删除临时文件
    fs.unlink(file.filepath, (err) => {
      if (err) {
        return;
      }
    });

    const url = `${config.OSS_CDNDOMAIN2}/${key}`;
    await imgcloud.create(userId, userName, file.originalFilename, key, file.mimetype, file.size, url);
    util.success(ctx);
  } catch (error) {
    fs.unlink(file.filepath, (err) => {
      if (err) {
        return;
      }
    });
    util.fail(ctx, JSON.stringify(error));
  }
});

// cdn列表
router.get('/list', async (ctx) => {
  const { userId } = util.decodeToken(ctx);
  const { pageNum = 1, pageSize = 24 } = ctx.request.query;
  const list = await imgcloud.list(userId, pageNum, pageSize);
  const { total } = await imgcloud.listCount(userId);
  util.success(ctx, {
    list,
    total,
    pageSize: +pageSize,
    pageNum: +pageNum,
  });
});

// 文件删除
router.post('/delete', async (ctx) => {
  const { userId } = util.decodeToken(ctx);
  const { id } = ctx.request.body;
  if (!id) {
    return ctx.throw(400, 'ID不能为空');
  }
  await imgcloud.delete(id, userId);
  util.success(ctx);
});

module.exports = router;
