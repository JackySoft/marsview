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
    pageId: number;
    pageName: string;
    remark: string;
    stgPublishId: number;
    prePublishId: number;
    prdPublishId: number;
    stgState: number;
    preState: number;
    prdState: number;
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
    pageId: 0,
    pageName: '',
    remark: '',
    stgState: 1,
    preState: 1,
    prdState: 1,
    stgPublishId: 0,
    prePublishId: 0,
    prdPublishId: 0,
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
        state.page.variableData[name] = value;
      }),
    );
  },
  setFormData({ name, value, type }: any) {
    set(
      produce((state) => {
        if (type === 'override') {
          state.page.formData[name] = value;
        } else {
          state.page.formData[name] = { ...state.page.formData[name], ...value };
        }
      }),
    );
  },
  // 清除页面信息
  clearPageInfo() {
    set(
      produce((state) => {
        state.page = {
          pageId: 0,
          pageName: '',
          remark: '',
          stgState: 1,
          preState: 1,
          prdState: 1,
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
        };
      }),
    );
  },
}));
