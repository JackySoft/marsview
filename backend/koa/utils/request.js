const { Axios } = require('axios');
/**
 * 通用请求封装类
 */
class Request {
  constructor(config) {
    this.instance = new Axios({
      baseURL: config.baseURL || '',
      timeout: 60000,
      timeoutErrorMessage: '请求超时',
      withCredentials: true,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }
  get(url, params, config = {}) {
    return this.instance.get(url, { params, ...config });
  }
  post(url, params, config = {}) {
    return this.instance.post(url, params, config);
  }
}

module.exports = new Request({});
