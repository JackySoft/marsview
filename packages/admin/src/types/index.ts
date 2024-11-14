/**
 * 菜单类型
 */

export interface IMenuItem {
  id: number;
  projectId: number;
  name: string;
  parentId: number;
  type: number;
  icon: string;
  path: string;
  pageId: number;
  sortNum: number;
  status: number;
  createdAt: string;
  buttons?: IMenuItem[];
  children?: IMenuItem[];
}

export interface ProjectItem {
  id: number;
  name: string;
  remark: string;
  logo: string;
  userName: string;
  userId: string;
  updatedAt: string;
  createdAt: string;
}
