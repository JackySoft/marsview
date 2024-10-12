const crypto = require('node:crypto');

/**
 * 公共加密函数
 */

/**
 * md5加密
 * @param {*} str 加密字符串
 * @returns 加密后字符串
 */
const md5Encry = (str) => {
  const md5 = crypto.createHash('md5');
  return md5.update(str, 'utf8').digest('hex');
};

module.exports = {
  md5Encry,
};
