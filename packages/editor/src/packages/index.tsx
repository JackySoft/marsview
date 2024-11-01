// export { Page, PageConfig } from './Page';
// export * from './Scene';
// export * from './Container';
// export * from './FormItems';
// export * from './Layout';
// export * from './EChart';
// export * from './Functional';
// export * from './Basic';
// export * from './FeedBack';
// export { BMap, BMapConfig } from './Other/BMap';
// export { IFrame, IFrameConfig } from './Other/IFrame';
import { lazy } from 'react';
import components from '../config/components';
import './index.less';
const componentMap: { [key: string]: any } = {};

function initComponent() {
  // 动态导入并注册组件
  const registerComponent = async (dir: string, path: string) => {
    componentMap[path] = lazy(() => import(`./${dir}/${path}/${path}`));
    console.log(`./${dir}/${path}Config`);
    import(`./${dir}/${path}/Schema`).then((res) => {
      componentMap[path + 'Config'] = res.default;
    });
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
}

initComponent();

console.log('componentMap', componentMap);
// 导出一个函数来获取注册的组件
export const getComponent = (name: string) => {
  return componentMap[name] || null;
};
