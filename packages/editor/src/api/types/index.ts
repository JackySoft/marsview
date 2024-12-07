/**
 * API参数类型定义
 */

export interface PageParams {
  keyword?: string;
  pageNum: number;
  pageSize?: number;
  projectId?: number;
}

export interface PageItem {
  id: number;
  name: string;
  userName: string;
  userId: number;
  remark: string;
  updatedAt: string;
  createdAt: string;
  stgPublishId: number;
  prePublishId: number;
  prdPublishId: number;
  stgState: number;
  preState: number;
  prdState: number;
  previewImg: string;
  projectId: number;
}

export interface PageReqParams {
  id: number;
}

export interface CreatePageParams {
  id: number;
  name: string;
  remark?: string;
  projectId: number;
}

export interface UpdatePageParams {
  id: number;
  userId: string;
  name: string;
}

export interface PublishPageParams {
  id: number;
  env: 'stg' | 'pre' | 'prd'; // 1 stg 2 pre 3 prod;
  previewImg: string;
}

export interface PublishListParams {
  pageNum: number;
  pageSize: number;
  env: 'stg' | 'pre' | 'prd'; // 1 stg 2 pre 3 prod;
  start?: string;
  end?: string;
  userName?: string;
  pageId: number;
}

/**
 * 项目类型定义
 */
export namespace Project {
  export interface ProjectItem {
    id: number;
    name: string;
    remark: string;
    logo: string;
    userId: number;
    userName: string;
    updatedAt: string;
    count: number;
  }
}
/**
 * 菜单管理类型定义
 */
export namespace Menu {
  export interface SearchParams {
    projectId: number;
    name?: string;
    status?: number;
  }
  // 菜单创建
  export interface CreateParams {
    projectId: number;
    name: string;
    parentId: number;
    type: number;
    icon: string;
    path: string;
    pageId: number;
    code: string;
    sortNum: number;
    status: number;
  }
  export interface MenuItem extends CreateParams {
    id: number;
    createdAt: string;
    buttons?: MenuItem[];
    children?: MenuItem[];
  }
  export interface EditParams extends CreateParams {
    id?: string;
    code: string;
  }

  export interface DelParams {
    id: string;
  }
}

export interface ProjectListParams {
  keyword?: string;
  pageNum: number;
  pageSize?: number;
  type?: number;
}

export interface ProjectCreateParams {
  name: string;
  remark?: string;
  logo: string;
}

export interface ProjectUpdateParams extends ProjectCreateParams {
  id: number;
}

export interface UserListParams {
  pageNum: number;
  pageSize: number;
  projectId: number;
  userName?: string;
}

export interface UserCreateParams {
  userId: number;
  userName: string;
  projectId: number;
  systemRole: 1 | 2;
  roleId: number;
}

export interface UserItem extends UserCreateParams {
  id: number;
  createdAt: string;
  updatedAt: string;
}

/**
 * 角色类型定义
 */
export namespace Role {
  export interface Params extends PageParams {
    name?: string;
    projectId: number;
  }
  export interface CreateParams {
    name: string;
    remark: string;
    projectId: string;
  }
  export interface RoleItem extends CreateParams {
    id: number;
    checked: string;
    halfChecked: string;
    projectId: string;
    updatedAt: string;
    createdAt: string;
  }
  export interface EditParams extends CreateParams {
    id: string;
  }
  export interface Permission {
    id: number;
    projectId: number;
    checked: string;
    halfChecked: string;
  }
}
