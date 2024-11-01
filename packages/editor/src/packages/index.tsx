import { lazy } from 'react';
import components from '../config/components';
import './index.less';

const componentMap: { [key: string]: any } = {};

// 动态导入并注册组件
const registerComponent = async (dir: string, path: string) => {
  componentMap[path] = lazy(() => import(`./${dir}/${path}/${path}`));
  componentMap[path + 'Config'] = () => import(`./${dir}/${path}/Schema`);
};
for (const { type, data = [] } of components) {
  if (data?.length > 0) {
    for (const { type: path } of data) {
      registerComponent(type, path);
    }
  } else {
    registerComponent('.', type);
  }
}

// 导出一个函数来获取注册的组件
export const getComponent = (name: string) => {
  if (typeof componentMap[name] === 'function') return componentMap[name]();
  return componentMap[name] || null;
};
