import { IMenuItem } from '@/types/index';

/**
 * 判断环境变量是否合法
 */
export function isEnv(env?: string) {
  return env && ['stg', 'pre', 'prd'].includes(env);
}
/**
 * 菜单数据转换
 * treeList: 树形菜单
 * buttons: 按钮
 * pageMap: 页面ID映射
 * menuMap: 菜单ID映射
 * @returns
 */
export function arrayToTree(array: IMenuItem[]) {
  const buttons: IMenuItem[] = [];
  const pageMap: { [key: number]: IMenuItem } = {};
  const menuMap: { [key: number]: IMenuItem } = {};
  // 创建一个映射，将id映射到节点对象
  const map: { [key: number]: IMenuItem & { children?: IMenuItem[] } } = {};
  array.forEach((item) => {
    map[item.id] = { ...item };
    if (item.type === 2) buttons.push(item);
    if ((item.type === 1 || item.type === 3) && item.page_id) pageMap[item.page_id] = { ...item };
    if (item.type === 1 || item.type === 3) menuMap[item.id] = { ...item };
  });

  // 找到每个节点的父节点
  array.forEach((item) => {
    if (item.parent_id && map[item.parent_id]) {
      const parentItem = map[item.parent_id];
      if (item.type === 1 || item.type === 3) {
        if (!parentItem.children) parentItem.children = [];
        parentItem.children?.push(map[item.id]);
        // 按照sort_num进行降序排序
        parentItem.children = parentItem.children.sort((a, b) => a.sort_num - b.sort_num);
      } else {
        if (!parentItem.buttons) parentItem.buttons = [];
        parentItem.buttons?.push(map[item.id]);
      }
    }
  });
  const menuTree = Object.values(map)
    .filter((item) => item.parent_id === null)
    .sort((a, b) => a.sort_num - b.sort_num);
  return {
    menuTree,
    buttons,
    pageMap,
    menuMap,
  };
}
