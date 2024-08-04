/**
 * 菜单类型
 */

export interface IMenuItem {
  id: number;
  project_id: number;
  name: string;
  parent_id: number;
  type: number;
  icon: string;
  path: string;
  page_id: number;
  sort_num: number;
  status: number;
  created_at: string;
  buttons?: IMenuItem[];
  children?: IMenuItem[];
}

export interface ProjectItem {
  id: number;
  name: string;
  remark: string;
  logo: string;
  sso_name: string;
  user_id: string;
  updated_at: string;
  created_at: string;
  members: Array<{
    id: number;
    role: 1 | 2;
    user_id: string;
    sso_name: string;
  }>;
}
