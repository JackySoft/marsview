import { create } from 'zustand';
import { produce } from 'immer';
import { ComponentType, ApiType, PageVariable, EventType, ComItemType } from '@materials/types';

export interface UserInfoStore {
  userId: number;
  userName: string;
  nickName: string;
  avatar: string;
  identifier: string;
}
export interface PageState {
  userInfo: UserInfoStore;
  page: {
    id: number;
    name: string;
    remark: string;
    projectId: number;
    stgState: 1 | 2 | 3 | 4; // 1:未保存 2:已保存 3:已发布 4:已回滚
    preState: 1 | 2 | 3 | 4; // 1:未保存 2:已保存 3:已发布 4:已回滚
    prdState: 1 | 2 | 3 | 4; // 1:未保存 2:已保存 3:已发布 4:已回滚
    stgPublishId: number;
    prePublishId: number;
    prdPublishId: number;
    previewImg?: string;
    userId: number;
    userName: string;
    pageData: {
      // 页面配置数据
      config: {
        props: any;
        // 页面综合样式(scopeCss + scopeStyle)
        style: React.CSSProperties;
        scopeCss: string;
        scopeStyle: React.CSSProperties;
        events: EventType[];
        api: {
          sourceType: 'json' | 'api';
          id: string;
          source: any;
          sourceField: string | { type: 'variable' | 'static'; value: string };
        };
      };
      events: Array<{ name: string; value: string }>;
      // 页面全局接口
      apis: { [key: string]: ApiType };
      elements: ComItemType[];
      elementsMap: { [key: string]: ComponentType };
      // 页面变量
      variables: PageVariable[];
      variableData: { [key: string]: any };
      // 表单数据
      formData: { [key: string]: any };
      // 全局拦截器
      interceptor: {
        headers?: {
          key: string;
          value: string;
        }[];
        timeout: number;
        timeoutErrorMessage: string;
        requestInterceptor?: string;
        responseInterceptor?: string;
      };
    };
  };
}
export interface PageAction {
  saveUserInfo: (userInfo: UserInfoStore) => void;
  savePageInfo: (pageInfo: any) => void;
  setVariableData: (payload: any) => void;
  setFormData: (payload: any) => void;
  clearPageInfo: () => void;
}
export const usePageStore = create<PageState & PageAction>((set) => ({
  userInfo: {
    userId: 0,
    userName: '',
    nickName: '',
    avatar: '',
    identifier: '',
  },
  selectedElement: undefined,
  page: {
    id: 0,
    name: '',
    remark: '',
    projectId: 0,
    userId: 0,
    userName: '',
    previewImg: '',
    stgState: 1,
    preState: 1,
    prdState: 1,
    stgPublishId: 0,
    prePublishId: 0,
    prdPublishId: 0,
    pageData: {
      config: {
        props: {},
        style: {},
        scopeCss: '',
        scopeStyle: {},
        events: [],
        api: {
          sourceType: 'json',
          id: '',
          source: {},
          sourceField: '',
        },
      },
      events: [],
      // 页面全局接口
      apis: {},
      elements: [],
      elementsMap: {},
      // 页面变量定义列表
      variables: [],
      // 页面变量数据
      variableData: {},
      // 表单数据
      formData: {},
      // 全局拦截器
      interceptor: {
        headers: [{ key: '', value: '' }],
        timeout: 8,
        timeoutErrorMessage: '请求超时，请稍后再试',
      },
    },
  },
  saveUserInfo: (userInfo: UserInfoStore) =>
    set(
      produce((state) => {
        state.userInfo = userInfo;
      }),
    ),
  // 保存页面信息
  savePageInfo: (payload: any) =>
    set(
      produce((state) => {
        state.page = Object.assign(state.page, payload);
      }),
    ),
  setVariableData({ name, value }: any) {
    set(
      produce((state) => {
        state.page.pageData.variableData[name] = value;
      }),
    );
  },
  setFormData({ name, value, type }: any) {
    set(
      produce((state) => {
        if (type === 'override') {
          state.page.pageData.formData[name] = value;
        } else {
          state.page.pageData.formData[name] = { ...state.page.pageData.formData[name], ...value };
        }
      }),
    );
  },
  // 清除页面信息
  clearPageInfo() {
    set(
      produce((state) => {
        state.page = {
          id: 0,
          name: '',
          remark: '',
          projectId: 0,
          userId: 0,
          userName: '',
          previewImg: '',
          stgState: 1,
          preState: 1,
          prdState: 1,
          stgPublishId: 0,
          prePublishId: 0,
          prdPublishId: 0,
          pageData: {
            config: {
              props: {},
              style: {},
              scopeCss: '',
              scopeStyle: {},
              events: [],
              api: {
                sourceType: 'json',
                id: '',
                source: {},
                sourceField: '',
              },
            },
            events: [],
            // 页面全局接口
            apis: {},
            elements: [],
            elementsMap: {},
            // 页面变量定义列表
            variables: [],
            // 页面变量数据
            variableData: {},
            // 表单数据
            formData: {},
            // 全局拦截器
            interceptor: {
              headers: [{ key: '', value: '' }],
              timeout: 8,
              timeoutErrorMessage: '请求超时，请稍后再试',
            },
          },
        };
      }),
    );
  },
}));
