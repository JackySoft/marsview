/**
 * 保存全局的组件ref引用
 */
const map = new Map();

export function getComponentRef(id: string) {
  return map.get(id);
}

export function setComponentRef(id: string, componentRef: any) {
  return map.set(id, componentRef);
}

export function clearComponentRef() {
  map.clear();
}
