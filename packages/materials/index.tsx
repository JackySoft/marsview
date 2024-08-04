const modules1 = import.meta.glob('./[A-Z][a-zA-Z]+/index.ts(x)?');
const modules2 = import.meta.glob('./[A-Z][a-zA-Z]+/*/index.ts(x)?');
const exportModule: any = {};
const modules = {
  ...modules1,
  ...modules2,
};

let regex = /\/([a-z]+)\/index/i;
for (const path in modules) {
  const componentName = path.match(regex);
  if (componentName?.[1]) {
    exportModule[componentName[1]] = modules[path];
  }
}
export const module = exportModule;
