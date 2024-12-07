/**
 * 对组件配置的api进行处理
 */

import { usePageStore } from '@/stores/pageStore';
import { ApiConfig } from '../types';
import request from './request';
import { message } from '@/utils/AntdGlobal';
import { getEnv, handleArrayVariable, renderFormula, renderTemplate } from './util';
import { get } from 'lodash-es';
import qs from 'qs';
import { isObject } from 'lodash-es';
import { isPlainObject } from 'lodash-es';
/**
 * 请求处理，事件行为模块配置的请求也会执行此方法
 * @param api 组件接口配置
 * @param sendParams 发送参数
 * @returns 返回结果
 */
export const handleApi = async (
  api: ApiConfig & { actionType?: string; filename?: string } = { sourceType: 'json', id: '', source: '', sourceField: '' },
  sendParams: any = {},
) => {
  if (api.sourceType === 'json') {
    let renderData = api.source;
    if (isPlainObject(renderData)) {
      if (typeof api.sourceField === 'object') {
        if (api.sourceField.type === 'static') {
          renderData = api.sourceField.value ? get(renderData, api.sourceField.value) : renderData;
        } else {
          renderData = renderFormula(api.sourceField.value, renderData);
        }
      } else if (typeof api.sourceField === 'string' && api.sourceField) {
        renderData = get(renderData, api.sourceField);
      }
    }

    return { code: 0, data: renderData };
  } else if (api.sourceType === 'api' || api.actionType === 'request' || api.actionType === 'download') {
    if (!api.id) {
      return { code: 0, data: '' };
    }
    const apis = usePageStore.getState().page.pageData.apis;
    const { method, stgApi, preApi, prdApi, contentType, replaceData = 'merge', isCors = true, params, result, tips } = apis[api.id] || {};
    // 处理参数
    const config: any = mergeParams(method, replaceData, params, sendParams);
    // 解析模板字符串：http://api.marsview.cc/user/${id}
    const stgUrl = renderTemplate(stgApi, sendParams);
    const preUrl = renderTemplate(preApi, sendParams);
    const prdUrl = renderTemplate(prdApi, sendParams);
    const env = getEnv();
    config.url = env === 'stg' ? stgUrl : env === 'pre' ? preUrl : prdUrl;
    config.isCors = isCors;
    let response = null;
    try {
      // 下载接口需要做单独处理，事件行为模块会传递actionType和filename
      if (api.actionType === 'download') {
        response = (await request.download(config.url, config.data, { ...config, filename: api.filename })) || {};
        if (response.data instanceof Blob) {
          return { code: 0, data: response.data, msg: '' };
        }
      } else {
        if (method === 'GET') {
          response = (await request.get(config.url, config)) || {};
        } else if (method === 'DELETE') {
          response = (await request.delete(config.url, config)) || {};
        } else {
          const data = contentType === 'application/x-www-form-urlencoded' ? qs.stringify(config.data) : config.data;

          config.headers = {
            ...config.headers,
            'Content-Type': contentType,
          };

          if (method === 'PUT') {
            response = (await request.put(config.url, data, config)) || {};
          } else if (method === 'PATCH') {
            response = (await request.patch(config.url, data, config)) || {};
          } else {
            response = (await request.post(config.url, data, config)) || {};
          }
        }
      }
    } catch (error: any) {
      response = {
        status: 200,
        data: { code: 500, data: '', msg: error },
      };
    }
    let res: { [key: string]: any } | any[] = response.data;
    // 判断是否是数组，如果是数组，则拼接标准结构进行返回，严格意义将，此处必须返回完整结构
    if (Array.isArray(res) || typeof res === 'string' || typeof res === 'number' || typeof res === 'boolean') {
      res = { code: 0, data: res, msg: '' };
    }
    // 字段映射
    const code = result.code ? Number(res[result.code] || 0) : 0;
    const data = result.data ? res[result.data] : res;
    const msg = result.msg ? res[result.msg] || '' : '';
    if (code === result.codeValue) {
      // 如果开启了系统提示，则优先使用系统提示
      if (tips?.isSuccess) {
        msg && message.success(msg);
      } else if (tips?.success) {
        // 最后使用自定义错误
        message.success(tips?.success);
      }
    } else {
      // 如果开启了系统错误，则优先使用系统报错
      if (tips?.isError && msg) {
        message.error(msg);
      } else if (tips?.fail) {
        // 最后使用自定义错误
        message.error(tips?.fail);
      }
    }
    // 根据 sourceField 解析数据
    let renderData = data;
    if (typeof api.sourceField === 'object') {
      if (api.sourceField.type === 'static') {
        renderData = api.sourceField.value ? get(res, api.sourceField.value) : data;
      } else {
        renderData = renderFormula(api.sourceField.value, res);
      }
    } else if (typeof api.sourceField === 'string' && api.sourceField) {
      renderData = get(res, api.sourceField);
    }
    return { code: code === result.codeValue ? 0 : code, data: renderData, originData: data, msg };
  } else {
    // 解析动态变量
    if (api.name?.value) {
      const value = renderFormula(api.name?.value);
      return { code: 0, data: value };
    }
    return { code: 0, data: '' };
  }
};

/**
 * 合并处理参数，包含静态数据和动态数据
 * @param method 当前请求方法
 * @param replaceData 是否替换默认参数
 * @param params 接口中配置的默认参数列表
 * @param sendParams 从事件中传递的参数对象，优先级高于params
 * @returns 合并后的参数对象
 */
export const mergeParams = (method: string, replaceData: 'merge' | 'cover' | 'reserve', params: any = [], sendParams: any) => {
  const values = handleArrayVariable(params, sendParams);
  let mergeValues: any = {};
  // 参数合并
  if (replaceData === 'merge') {
    // 基础类型不能合并，否则会报错
    if (Array.isArray(sendParams) || typeof sendParams !== 'object') {
      if (Object.keys(values).length > 0) {
        mergeValues = values;
      } else {
        mergeValues = sendParams;
      }
    } else {
      mergeValues = { ...values, ...sendParams };
    }
  } else if (replaceData === 'cover') {
    // 覆盖的前提是，sendParams 必须有值，否则会保留当前参数
    if ((isObject(sendParams) && Object.keys(sendParams).length > 0) || (!isObject(sendParams) && sendParams)) {
      mergeValues = sendParams;
    } else {
      mergeValues = values;
    }
  } else {
    mergeValues = values;
  }
  // 根据请求方法，处理参数
  if (method === 'GET' || method === 'DELETE') {
    return {
      params: mergeValues,
    };
  } else {
    return {
      data: mergeValues,
    };
  }
};
