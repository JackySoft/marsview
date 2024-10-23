const Router = require('@koa/router');
const fs = require('fs');
const router = new Router({ prefix: '/api/upload' });
const util = require('../utils/util');
const sdk = require('@baiducloud/sdk');
const config = require('../config');

/**
 * 文件上传
 */
router.post('/files', async (ctx) => {
  try {
    const file = ctx.request.files.file;
    const id = ctx.request.body.id || '';
    const ossConfig = {
      endpoint: config.OSS_ENDPOINT, //传入Bucket所在区域域名
      credentials: {
        ak: config.OSS_ACCESSKEY, //您的AccessKey
        sk: config.OSS_ACCESSKEYSECRET, //您的SecretAccessKey
      },
    };
    let bucket = config.OSS_BUCKET1;
    let key = `imgs/${id}_${file.newFilename}`;
    let client = new sdk.BosClient(ossConfig);

    const buffer = fs.readFileSync(file.filepath);
    await client.putObject(bucket, key, buffer, {
      'Content-Type': 'image/png', // 添加http header
      'Cache-Control': 'public, max-age=31536000', // 指定缓存指令
      'x-bce-storage-class': 'COLD', // 指定存储类型
      'x-bce-acl': 'public-read',
    });
    fs.unlink(file.filepath, (err) => {
      if (err) {
        return;
      }
    });

    util.success(ctx, {
      name: file.originalFilename,
      size: file.size,
      type: file.mimetype,
      url: `${config.OSS_CDNDOMAIN1}/${key}`,
    });
  } catch (error) {
    util.fail(ctx, JSON.stringify(error));
  }
});

module.exports = router;
