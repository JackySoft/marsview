/**
 * API参数类型定义
 */

export interface PageParams {
  keyword?: string;
  pageNum: number;
  pageSize?: number;
  type?: number;
}

export interface PageItem {
  id: number;
  name: string;
  user_name: string;
  user_id: number;
  remark: string;
  updated_at: string;
  created_at: string;
  stg_publish_id: number;
  pre_publish_id: number;
  prd_publish_id: number;
  stg_state: number;
  pre_state: number;
  prd_state: number;
  members: Array<{
    id: number;
    role: 1 | 2;
    user_id: string;
    user_name: string;
  }>;
  preview_img: string;
}

export interface PageReqParams {
  id: number;
}

export interface CreatePageParams {
  name: string;
  user_name: string;
  user_id: string;
}

export interface UpdatePageParams {
  id: number;
  user_id: string;
  name: string;
}

export interface PublishPageParams {
  page_id: number;
  env: 'stg' | 'pre' | 'prd'; // 1 stg 2 pre 3 prod;
  preview_img: string;
}

export interface PublishListParams {
  pageNum: number;
  pageSize: number;
  env: 'stg' | 'pre' | 'prd'; // 1 stg 2 pre 3 prod;
  start?: string;
  end?: string;
  publish_user_id?: string;
  page_id: number;
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
    user_name: string;
    user_id: number;
    is_edit: boolean;
    updated_at: string;
    created_at: string;
    members?: Array<{
      id: number;
      role: 1 | 2;
      user_id: string;
      user_name: string;
    }>;
  }
}
/**
 * 菜单管理类型定义
 */
export namespace Menu {
  export interface SearchParams {
    project_id: number;
    name?: string;
    status?: number;
  }
  // 菜单创建
  export interface CreateParams {
    project_id: number;
    name: string;
    parent_id: number;
    type: number;
    icon: string;
    path: string;
    page_id: number;
    code: string;
    sort_num: number;
    status: number;
  }
  export interface MenuItem extends CreateParams {
    id: number;
    created_at: string;
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
  is_public: number;
}

export interface ProjectUpdateParams extends ProjectCreateParams {
  id: number;
}

export interface UserListParams {
  pageNum: number;
  pageSize: number;
  project_id: number;
  user_name?: string;
}

export interface UserCreateParams {
  user_id: number;
  user_name: string;
  project_id: number;
  system_role: 1 | 2;
  role_id: number;
}

export interface UserItem extends UserCreateParams {
  id: number;
  created_at: string;
  updated_at: string;
}

/**
 * 角色类型定义
 */
export namespace Role {
  export interface Params extends PageParams {
    name?: string;
    project_id: number;
  }
  export interface CreateParams {
    name: string;
    remark: string;
    project_id: string;
  }
  export interface RoleItem extends CreateParams {
    id: number;
    checked: string;
    half_checked: string;
    project_id: string;
    updated_at: string;
    created_at: string;
  }
  export interface EditParams extends CreateParams {
    id: string;
  }
  export interface Permission {
    id: number;
    project_id: number;
    checked: string;
    half_checked: string;
  }
}

export namespace AIChat {
  export interface AILibChatProps {
    message: string;
  }
}
