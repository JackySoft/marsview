import request from '@/utils/request';
import {
  PageParams,
  PageReqParams,
  CreatePageParams,
  PublishPageParams,
  PublishListParams,
  ProjectListParams,
  ProjectCreateParams,
  ProjectUpdateParams,
  UserListParams,
  UserCreateParams,
  Menu,
  Role,
} from './types';
export default {
  getCategoryList(params: PageParams) {
    return request.get('/page/category', params);
  },
};
