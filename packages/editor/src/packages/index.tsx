import { lazy } from 'react';
import './index.less';

const componentMap: { [key: string]: any } = {};

/**
 * 动态加载组件和Schema配置
 */
const modules: { [key: string]: () => Promise<any> } = import.meta.glob('./[a-zA-Z]+/**');

for (const path in modules) {
  const [type, name] = path.split('/').slice(-2);
  if (type === 'MarsRender') continue;
  if (name.indexOf('Schema') > -1) {
    componentMap[type + 'Config'] = modules[path];
  }
  if (type === name.split('.')?.[0]) {
    componentMap[type] = lazy(modules[path]);
  }
}

// 导出一个函数来获取注册的组件
export const getComponent = (name: string) => {
  if (typeof componentMap[name] === 'function') return componentMap[name]();
  return componentMap[name] || null;
};
