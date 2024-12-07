/**
 * 物料工具箱
 */

import dayjs from 'dayjs';
import { usePageStore } from '@materials/stores/pageStore';
import { ComponentType } from '@materials/types';
import { get } from 'lodash-es';
import { cloneDeep } from 'lodash-es';
import copy from 'copy-to-clipboard';
import storage from './storage';

/**
 * 生成ID
 * @param name
 * @returns
 */
export const createId = (name: string = 'mars', len = 11) => {
  return (
    name +
    '_' +
    Number(Math.random().toString().substring(2, 12) + Date.now())
      .toString(36)
      .slice(0, len)
  );
};
/**
 * 数字格式化，支持数字、金额、百分百；
 * @param num
 * @returns
 */
export const formatNumber = (num?: number | string, formatType?: 'decimal' | 'currency' | 'percent') => {
  if (!num) return '0.00';
  const a = parseFloat(num.toString());
  if (isNaN(a)) return num;
  if (!formatType) return a.toLocaleString();
  return a.toLocaleString('zh-CN', { style: formatType, currency: 'CNY' });
};

/**
 * 格式化日期
 * @param date
 * @param rule
 * @returns
 */
export const formatDate = (date?: Date | string, rule: string = 'YYYY-MM-DD HH:mm:ss') => {
  return date ? dayjs(date).format(rule) : '';
};

// 获取单个日期
export const getDateByType = (type: string) => {
  const date = new Date();
  if (!type) return undefined;
  if (type == 'today') return dayjs(date.toLocaleString());
  if (type == 'yesterday') {
    date.setDate(date.getDate() - 1);
  }
  if (type == 'last7') {
    date.setDate(date.getDate() - 7);
  }
  if (type == 'last30') {
    date.setMonth(date.getMonth() - 1);
  }
  if (type == 'last90') {
    date.setMonth(date.getMonth() - 3);
  }
  return dayjs(date.toLocaleString());
};
/**
 * 获取日期范围
 * now: 当前时间戳
 * today: 今天0-24点
 * yesterday: 昨天0-24点
 * last7: 最近7天
 * last30: 最近30天
 * last60: 最近60天
 * last90: 最近90天
 * curWeek: 本周
 * lastWeek: 上周
 * curMonth: 本月
 * curYear: 本年
 * lastYear: 去年
 * curQuarter: 当前季度
 * @returns [startTime,endTime]
 */
export const getDateRangeByType = (type: string) => {
  const startDate = new Date();
  const endDate = new Date();
  if (!type) return [undefined, undefined];
  // 今天、本周、本月、本年
  if (['today', 'curWeek', 'curMonth', 'curYear', 'curQuarter'].includes(type)) {
    if (type == 'today') {
      //默认即为当天
    } else if (type == 'curWeek') {
      startDate.setDate(startDate.getDate() - startDate.getDay() + 1);
    } else if (type == 'curMonth') {
      startDate.setDate(1);
    } else if (type == 'curYear') {
      startDate.setDate(1);
      startDate.setMonth(0);
    } else if (type == 'curQuarter') {
      startDate.setDate(1);
      const month = startDate.getMonth();
      startDate.setMonth(Math.floor(month / 3) * 3);
    }
    return [dayjs(startDate.toLocaleString()), dayjs(endDate.toLocaleString())];
  }
  // 昨天、上周、上月
  if (['yesterday', 'lastWeek', 'lastMonth', 'last3Month', 'lastYear'].includes(type)) {
    if (type == 'yesterday') {
      startDate.setDate(startDate.getDate() - 1);
    } else if (type == 'lastWeek') {
      startDate.setDate(startDate.getDate() - 7);
    } else if (type == 'lastMonth') {
      startDate.setMonth(startDate.getMonth() - 1);
    } else if (type == 'last3Month') {
      startDate.setMonth(startDate.getMonth() - 3);
    } else if (type == 'lastYear') {
      startDate.setFullYear(startDate.getFullYear() - 1);
    }
    return [dayjs(startDate.toLocaleString()), dayjs(endDate.toLocaleString())];
  }
};

/**
 * 判断变量是否为空
 */
export const isNull = (value: any) => {
  if (value === undefined || value === null) return true;
  return false;
};

/**
 * 判断变量是否为空
 */
export const isNotEmpty = (value: any) => {
  if (value === '' || value === undefined || value === null) return false;
  return true;
};

/**
 * 复制文本到剪切板
 * @param text 复制内容
 * @param callback 兼容历史代码，作为成功识别的回调,1:成功 2:失败
 */
export function copyText(text: string) {
  return copy(text);
}

/**
 * 模板解析:
 * 1. ${ id } => 101
 * 2. ${ status == 0 ? 1:0 } => 1
 */
export function renderTemplate(template: string, data: any) {
  return template?.replace(/\$\{([^}]+)\}/g, (match, key) => {
    if (key.includes('?')) {
      try {
        const fn = new Function('param', `return param.${key}`);
        return fn(data);
      } catch (error) {
        return key;
      }
    }
    return get(data, key) || '';
  });
}

/**
 * 获取页面变量
 */
export function getPageVariable(name?: string) {
  const pageStore = usePageStore.getState().page.pageData;
  const data: { [key: string]: any } = {};
  pageStore.variables.forEach((item) => {
    data[item.name] = pageStore.variableData[item.name] ?? item.defaultValue;
  });
  return name ? data[name] : data;
}

/**
 * 创建动态函数
 */
export function createFunction(params: Array<string> | string, body: string) {
  // 删除注释
  const scripts = body
    .replace(/^\s*\/\/.*$/gm, '')
    .replace(/\/\*[\s\S]*?\*\//g, '')
    .trim();
  // 将参数列表转换为字符串
  const paramStr = Array.isArray(params) ? params.join(', ') : params;
  // 支持内部嵌套函数
  if (scripts.startsWith('function')) {
    return new Function(paramStr, `return ${scripts};`);
  }
  // 构造函数体
  const funcStr = scripts.indexOf('return') > -1 ? scripts : `return ${scripts};`;
  return new Function(paramStr, funcStr);
}

/**
 * 渲染逻辑表达式
 * @param formula 表达式字符串
 * @param eventParams 表达式参数，在事件流执行的过程中，如果调用的是脚本运行，则会传入上一个事件流的返回值
 */
export function renderFormula(formula: string, eventParams?: any) {
  try {
    if (!formula) return '';
    // 通过正则获取表单ID
    // eslint-disable-next-line no-useless-escape
    const formIds: Array<string> = formula.match(/([A-Za-z]+_\w+)\.[\w\.]*/g) || [];
    const originIds: Array<string> = [...new Set(formIds.map((id) => id.split('.')[0]))];
    const fnParams: Array<string> = ['context', 'eventParams'];
    const {
      page: { pageData },
      userInfo,
    } = usePageStore.getState();
    const formData = cloneDeep(pageData.formData || {});
    originIds.forEach((id: string) => {
      // 如果绑定的是表单项，则通过Form实例对象获取对应表单值
      const formValues = pageData.formData?.[id] || {};
      if (!formData?.id) {
        formData[id] = formValues;
      }
    });
    const variableData = getPageVariable();
    const dynamicFunc = createFunction(fnParams, formula);
    // 添加日期格式化
    const FORMAT = (date: any, fmt: string = 'YYYY-MM-DD HH:mm:ss') => {
      return dayjs(date).format(fmt);
    };
    const context = {
      store: userInfo,
      variable: variableData,
      eventParams,
      FORMAT,
      ...formData,
    };
    const result = dynamicFunc(context, eventParams || {});
    if (typeof result === 'function') return result(context, eventParams || {});
    return result;
  } catch (error) {
    console.error('表达式解析失败：', error);
  }
  return '';
}

/**
 * 递归查找日期组件
 */
export const getDateItem = (elements: ComponentType[], list: string[]): string[] => {
  for (let i = 0; i < elements.length; i++) {
    const item = elements[i];
    if (['DatePicker', 'TimePicker', 'DatePickerRange', 'TimePickerRange', 'EditTable'].includes(item.type)) {
      list.push(item.id);
    } else if (item.elements?.length) {
      getDateItem(item.elements, list);
    }
  }
  return list;
};

/**
 * 针对日期组件值做特殊处理，因为日期赋值必须转换为dayjs对象
 * @param list 组件列表
 * @param values 表单数据值
 */
export const dateFormat = (list: Array<ComponentType>, values: any) => {
  const elementsMap = usePageStore.getState().page.pageData.elementsMap;
  const dates = getDateItem(list, []);
  dates.map((id: string) => {
    const { type, config } = elementsMap[id];
    const {
      startField,
      endField,
      formItem: { name },
      formWrap: { format, columns },
    } = config.props;
    if (['DatePicker', 'TimePicker'].includes(type)) {
      if (!values[name]) return;
      values[name] = values[name]?.format?.(format) || dayjs(values[name]);
    } else if (['DatePickerRange', 'TimePickerRange'].includes(type)) {
      if (values[name]?.length == 2) {
        const [start, end] = values[name]?.map((date: any) => date?.format?.(format) || dayjs(values[date])) || [undefined, undefined];
        if (startField && endField) {
          values[startField] = start;
          values[endField] = end;
          delete values[name];
        }
      } else {
        if (values[startField] && values[endField]) {
          values[name] = [dayjs(values[startField]), dayjs(values[endField])];
        }
      }
    } else if (type === 'EditTable') {
      columns
        .filter((item: any) => item.type === 'date')
        .map(({ dataIndex }: { dataIndex: string }) => {
          values[name].map((item: any) => {
            if (item[dataIndex]) item[dataIndex] = dayjs(item[dataIndex]);
          });
        });
    }
  });
  return values;
};

/**
 * 解析参数中包含的变量
 * 1. 组件属性配置中的变量参数
 */
export const handleParamVariable = (params: any = {}, data?: any) => {
  return Object.keys(params).reduce<any>((prev, cur) => {
    const variableObj = params[cur];
    // 如果组件属性是对象，则判断是静态值还是变量
    if (typeof variableObj === 'object') {
      // 如果是静态值，则直接赋值。
      if (variableObj?.type === 'static') {
        prev[cur] = variableObj.value;
      } else if (variableObj?.type === 'variable') {
        // 绑定变量时，可能是变量，也可能是绑定某一个表单值
        prev[cur] = renderFormula(variableObj.value, data);
      } else {
        prev[cur] = variableObj;
      }
    } else {
      prev[cur] = variableObj;
    }
    return prev;
  }, {});
};

/**
 * 解析数组中包含的变量
 * 1. Http设置中的请求头参数
 * 2. Http设置中的发送参数
 * 3. 事件行为中的发送参数
 */
export const handleArrayVariable = (list: any = [], data: any = {}) => {
  return list.reduce((prev: any, next: any) => {
    if (next.key) {
      if (typeof next.value === 'string') {
        if (isNotEmpty(next.value)) {
          // 解析模板语法
          const val: any = renderTemplate(next.value, data);
          // 数字转换
          prev[next.key] = isNotEmpty(val) ? (isNaN(val) ? val : Number(val)) : '';
        } else {
          prev[next.key] = '';
        }
      } else {
        if (next.value.type === 'static') {
          if (isNotEmpty(next.value.value)) {
            // 解析模板语法
            const val: any = renderTemplate(next.value.value, data);
            // 数字转换
            prev[next.key] = isNotEmpty(val) ? (isNaN(val) ? val : Number(val)) : '';
          } else {
            prev[next.key] = '';
          }
        } else {
          // 变量不支持模板字符串语法
          const result = renderFormula(next.value.value, data);
          prev[next.key] = isNotEmpty(result) ? result : '';
        }
      }
    }
    return prev;
  }, {});
};

/**
 * 动态加载css
 * @param src
 * @returns Promise
 */
export const loadStyle = (id: string, src: string) => {
  if (!src) return;
  return new Promise((resolve, reject) => {
    if (document.getElementById(id)) return;
    // 创建一个新的link元素
    const link = document.createElement('link');

    // 设置link元素的属性
    link.rel = 'stylesheet';
    link.type = 'text/css';
    link.href = src;
    link.onload = resolve;
    link.onerror = reject;
    link.setAttribute('id', id);
    // 将link元素添加到DOM的head部分
    document.getElementsByTagName('HEAD')[0].appendChild(link);
  });
};

/**
 * 动态加载JS，主要用于解决不常用的JS包，防止影响整体性能，比如抖音和快手
 * @param src
 * @returns Promise
 */
export const loadScript = (src: string) => {
  return new Promise((resolve, reject) => {
    const script = document.createElement('script');
    script.type = 'text/javascript';
    script.defer = true;
    script.onload = resolve;
    script.onerror = reject;
    script.src = src;
    document.body.append(script);
  });
};

/**
 * 获取环境变量
 * 开发环境默认返回 stg
 * 页面打开，获取环境参数
 * 项目打开，优先通过storage获取环境参数
 * 5. env 当前真实环境
 */
export const getEnv = () => {
  const isDev = /^\/editor\/\d+\/edit/.test(location.pathname);
  if (isDev) return 'stg';
  const isPage = /^\/page\/\d+/.test(location.pathname);
  if (isPage) {
    const search = new URLSearchParams(location.search);
    return search.get('env') || 'prd';
  }
  const match = location.pathname.match(/^\/project\/(\d+)\/(\d+)/);
  if (match && match[1]) {
    return storage.get(match[1] + '-env') || 'prd';
  }
  return 'prd';
};

/**
 * 获取页面ID
 * @param pageId 页面路径或者页面ID
 * @param pageMap 菜单映射对象
 * @returns
 */
export function getPageId(pageId: string | undefined, pageMap: Record<number, any>): number {
  if (!pageId || !pageMap) return 0;
  const id = isNaN(Number(pageId))
    ? Object.values(pageMap).filter((item) => {
        return item.path.startsWith('/') ? item.path.slice(1) === pageId : item.path === pageId;
      })?.[0]?.pageId
    : pageId;
  return id;
}
