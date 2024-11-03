const componentMap: { [key: string]: any } = {};

/**
 * 按需加载组件
 */
const modules: { [key: string]: () => Promise<any> } = import.meta.glob('./[a-zA-Z]+/**');

for (const path in modules) {
  const [type, name] = path.split('/').slice(-2);
  if (type === 'MarsRender') continue;
  if (type === name.split('.')?.[0]) {
    componentMap[type] = modules[path];
  }
}

export const module = componentMap;
