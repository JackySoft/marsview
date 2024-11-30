import request from '@/utils/request';
import { PageParams } from './types';
export default {
  getCategoryList(params: PageParams) {
    return request.get('/project/category', params);
  },
};
