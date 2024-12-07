import { IMenuItem } from '@/types/index';

/**
 * 判断环境变量是否合法
 */
export function isEnv(env?: string) {
  return env && ['stg', 'pre', 'prd'].includes(env);
}
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
/**
 * 菜单数据转换
 * treeList: 树形菜单
 * buttons: 按钮
 * pageMap: 页面ID映射
 * menuMap: 菜单ID映射
 * @returns
 */
export function arrayToTree(array: IMenuItem[] = []) {
  const buttons: IMenuItem[] = [];
  const pageMap: { [key: number]: Pick<IMenuItem, 'id' | 'pageId' | 'parentId' | 'name' | 'path'> } = {};
  const menuMap: { [key: number]: IMenuItem } = {};
  // 创建一个映射，将id映射到节点对象
  const map: { [key: number]: IMenuItem & { children?: IMenuItem[] } } = {};
  array.forEach((item) => {
    map[item.id] = { ...item };
    if (item.type === 2) buttons.push(item);
    if (item.type === 1 || item.type === 3) {
      if (item.pageId) {
        pageMap[item.pageId] = { id: item.id, pageId: item.pageId, parentId: item.parentId, name: item.name, path: item.path };
      } else {
        menuMap[item.id] = { ...item };
      }
    }
  });

  // 找到每个节点的父节点
  array.forEach((item) => {
    if (item.parentId && map[item.parentId]) {
      const parentItem = map[item.parentId];
      if (item.type === 1 || item.type === 3) {
        if (!parentItem.children) parentItem.children = [];
        parentItem.children?.push(map[item.id]);
        // 按照sortNum进行降序排序
        parentItem.children = parentItem.children.sort((a, b) => a.sortNum - b.sortNum);
      } else {
        if (!parentItem.buttons) parentItem.buttons = [];
        parentItem.buttons?.push(map[item.id]);
      }
    }
  });
  const menuTree = Object.values(map)
    .filter((item) => !item.parentId)
    .sort((a, b) => a.sortNum - b.sortNum);
  return {
    menuTree,
    buttons,
    pageMap,
    menuMap,
  };
}
