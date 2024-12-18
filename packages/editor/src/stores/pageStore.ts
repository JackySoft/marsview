import { create } from 'zustand';
import { produce } from 'immer';
import { ComponentType, ApiType, PageVariable, EventType, ComItemType } from '@/packages/types';
import { cloneDeep } from 'lodash-es';
import { createId, getElement } from '@/utils/util';
/**
 * 页面信息存储
 */
export interface UserInfoStore {
  userId: number;
  userName: string;
}
export interface PageState {
  userInfo: UserInfoStore;
  mode: 'edit' | 'preview';
  selectedElement: { type: string; id: string } | undefined;
  isUpdateToolbar: boolean; // 更新遮罩
  page: {
    pageId: number;
    pageName: string;
    remark: string;
    is_public: number;
    is_edit: number;
    stg_state: 1 | 2 | 3 | 4; // 1:未保存 2:已保存 3:已发布 4:已回滚
    pre_state: 1 | 2 | 3 | 4; // 1:未保存 2:已保存 3:已发布 4:已回滚
    prd_state: 1 | 2 | 3 | 4; // 1:未保存 2:已保存 3:已发布 4:已回滚
    stg_publish_id: number;
    pre_publish_id: number;
    prd_publish_id: number;
    preview_img: string;
    user_id: string;
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
    elements: ComponentType[];
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
  updatePageState: (payload: any) => void;
  addApi: (api: ApiType) => void;
  updateApi: (api: ApiType) => void;
  removeApi: (name: string) => void;
  setMode: (mode: 'edit' | 'preview') => void;
  addElement: (element: any) => void;
  addChildElements: (element: any) => void;
  editElement: (payload: any) => void;
  editTableProps: (payload: any) => void;
  editEvents: (payload: any) => void;
  moveElements: (payload: any) => void;
  setSelectedElement: (payload: any) => void;
  removeElements: (payload: any) => void;
  dragSortElements: (payload: any) => void;
  addVariable: (payload: PageVariable) => void;
  editVariable: (payload: PageVariable) => void;
  removeVariable: (name: string) => void;
  setVariableData: (payload: any) => void;
  setFormData: (payload: any) => void;
  setInterceptor: (payload: any) => void;
  updateToolbar: () => void;
  clearPageInfo: () => void;
}
export const usePageStore = create<PageState & PageAction>((set) => ({
  userInfo: {
    userId: 0,
    userName: '',
  },
  mode: 'edit',
  selectedElement: undefined,
  isUpdateToolbar: false,
  page: {
    pageId: 0,
    pageName: '',
    remark: '',
    is_public: 1,
    is_edit: 1,
    stg_state: 1,
    pre_state: 1,
    prd_state: 1,
    stg_publish_id: 0,
    pre_publish_id: 0,
    prd_publish_id: 0,
    preview_img: '',
    user_id: '',
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
        if (payload.type === 'props') {
          state.page.config.props = payload.props;
        } else if (payload.type === 'style') {
          // 如果是style，则直接更新
          state.page.config.scopeCss = payload.scopeCss;
          state.page.config.scopeStyle = payload.scopeStyle;
          state.page.config.style = payload.style;
        } else if (payload.type === 'events') {
          state.page.config.events = payload.events || [];
        } else if (payload.type === 'api') {
          state.page.config.api = payload.api;
        } else {
          state.page = Object.assign(state.page, payload);
        }
      }),
    ),
  updatePageState: ({ env, pageState }) => {
    set(
      produce((state) => {
        if (env === 'all') {
          state.page.stg_state = 2;
          state.page.pre_state = 2;
          state.page.prd_state = 2;
        } else {
          state.page[env] = pageState;
        }
      }),
    );
  },
  addApi: (api) => {
    set(
      produce((state) => {
        state.page.apis[api.id] = api;
      }),
    );
  },
  updateApi: (api) => {
    set(
      produce((state) => {
        Object.assign(state.page.apis[api.id], api);
      }),
    );
  },
  removeApi: (id) => {
    set(
      produce((state) => {
        delete state.page.apis[id];
      }),
    );
  },
  // 切换编辑模式
  setMode: (mode: 'edit' | 'preview') => set({ mode }),
  // 添加组件
  addElement: (element: ComponentType) => {
    set(
      produce((state) => {
        state.page.elements.push({
          id: element.id,
          parentId: element.parentId,
          type: element.type,
          name: element.name,
          elements: element.elements?.map((item) => ({ id: item.id, parentId: element.id, type: item.type, name: item.name })) || [],
        });
        const childElement = cloneDeep({
          ...element,
          elements: undefined,
          remoteUrl: element.remoteUrl,
          remoteConfigUrl: element.remoteConfigUrl,
          remoteCssUrl: element.remoteCssUrl,
        });
        if (element.config.props.formItem) {
          childElement.config.props.formItem.name = createId(element.type, 6);
        }
        // 添加当前组件对象
        state.page.elementsMap[element.id] = childElement;
        // 添加子组件对象
        element.elements?.map((item) => {
          state.page.elementsMap[item.id] = item;
        });
      }),
    );
  },
  // 添加子组件
  addChildElements(element: ComponentType) {
    set(
      produce((state) => {
        function deepFind(list: ComItemType[]) {
          for (let i = 0; i < list.length; i++) {
            const item = list[i];
            // 根据parentId先找到当前组件的父组件
            if (item.id == element.parentId) {
              if (item.elements === undefined) {
                item.elements = [];
              }
              item.elements.push({
                id: element.id,
                parentId: element.parentId,
                type: element.type,
                name: element.name,
                elements:
                  element.elements?.map((item) => ({ id: item.id, parentId: element.id, type: item.type, name: item.name, elements: [] })) || [],
              });
              const childElement = cloneDeep({
                ...element,
                elements: undefined,
                remoteUrl: element.remoteUrl,
                remoteConfigUrl: element.remoteConfigUrl,
                remoteCssUrl: element.remoteCssUrl,
              });
              if (element.config.props.formItem) {
                childElement.config.props.formItem.name = createId(element.type, 6);
              }
              // 添加当前组件对象
              state.page.elementsMap[element.id] = childElement;
              // 添加子组件对象
              element.elements?.map((item) => {
                state.page.elementsMap[item.id] = item;
              });
              break;
            } else if (item.elements?.length) {
              deepFind(item.elements);
            }
          }
          return list;
        }
        deepFind(state.page.elements);
        state.isUpdateToolbar = !state.isUpdateToolbar;
      }),
    );
  },
  // 更新组件属性、样式
  editElement(payload: any) {
    set(
      produce((state) => {
        const item = state.page.elementsMap[payload.id];
        // 属性修改
        if (payload.type === 'props') {
          item.config.props = payload.props;
          // Tabs标签对象需要同步属性值到Tab组件中
          if (item.type === 'Tabs') {
            const { element: parentItem } = getElement(state.page.elements, payload.id);
            if (parentItem?.elements.length === payload.props.items.length) {
              parentItem?.elements.map((item, index) => {
                Object.assign(state.page.elementsMap[item.id].config.props, payload.props.items[index]);
              });
            } else {
              parentItem?.elements.map((item, index) => {
                if (!payload.props.items.find((prop: { id: string }) => prop.id === item.id)) {
                  parentItem?.elements.splice(index, 1);
                  delete state.page.elementsMap[item.id];
                  // 递归删除相互引用的嵌套父子组件
                  const deepRemove = (id: string) => {
                    // 删除子组件
                    Object.values(state.page.elementsMap).map((item: any) => {
                      if (item.parentId == id) {
                        delete state.page.elementsMap[item.id];
                        deepRemove(item.id);
                      }
                      return item;
                    });
                  };
                  deepRemove(item.id);
                }
              });
            }
          }
          // Tab对象需要同步属性值到Tabs组件中
          if (item.type === 'Tab') {
            state.page.elementsMap[item.parentId].config.props.items.map((item: { key: string; label: string }) => {
              if (item.key === payload.id) {
                item.label = payload.props.label;
              }
            });
          }
        } else if (payload.type === 'style') {
          // 如果是style，则直接更新
          item.config.scopeCss = payload.scopeCss;
          item.config.scopeStyle = payload.scopeStyle;
          item.config.style = payload.style;
        } else if (payload.type === 'events') {
          item.config.events = payload.events || [];
        } else if (payload.type === 'api') {
          item.config.api = payload.api;
          if (payload.api.sourceType !== 'api') {
            item.config.api.id = undefined;
          } else {
            // 如果ID存在，更新一下数据源字段即可。
            if (payload.api.id) {
              state.page.apis[payload.api.id].sourceField = payload.api.sourceField;
            }
          }
        }
        state.isUpdateToolbar = !state.isUpdateToolbar;
      }),
    );
  },
  // 更新表格列表的操作按钮
  editTableProps(payload: any) {
    set(
      produce((state) => {
        const item = state.page.elementsMap[payload.id];
        if (payload.type === 'column') {
          if (!item.config.props.columns) item.config.props.columns = [];
          item.config.props.columns[payload.index] = payload.props;
        } else if (payload.type === 'formTable') {
          if (!item.config.props.formWrap.columns) item.config.props.formWrap.columns = [];
          item.config.props.formWrap.columns[payload.index] = payload.props;
        } else if (payload.type === 'items') {
          if (!item.config.props.items) item.config.props.items = [];
          item.config.props.items[payload.index] = payload.props;
        } else {
          if (!item.config.props.bulkActionList) item.config.props.bulkActionList = [];
          item.config.props.bulkActionList[payload.index] = payload.props;
        }
        state.isUpdateToolbar = !state.isUpdateToolbar;
      }),
    );
  },
  // 更新组件事件，比如表格中动态新加的按钮，需要更新事件
  editEvents(payload: any) {
    set(
      produce((state) => {
        const item = state.page.elementsMap[payload.id];
        item.events = payload.events;
      }),
    );
  },
  // 组件排序
  moveElements(payload: any) {
    set(
      produce((state) => {
        const { componentId, direction } = payload;
        function deepFind(list: ComponentType[]) {
          for (let index = 0; index < list.length; index++) {
            const item = list[index];
            if (item.id == componentId) {
              if (direction === 'up' && index > 0) {
                [list[index], list[index - 1]] = [list[index - 1], list[index]];
              } else if (direction === 'down' && list.length - 1 > index) {
                [list[index], list[index + 1]] = [list[index + 1], list[index]];
              }
              break;
            } else if (item.elements?.length) {
              deepFind(item.elements);
            }
          }
        }
        deepFind(state.page.elements);
      }),
    );
  },
  // 组件大纲拖拽排序
  dragSortElements(payload: any) {
    set(
      produce((state) => {
        state.page.elements = payload;
      }),
    );
  },
  // 设置选中的组件列表
  setSelectedElement(payload: any) {
    set(() => {
      return { selectedElement: payload };
    });
  },
  removeElements(payload: any) {
    set(
      produce((state) => {
        const id = payload;
        function deepFind(list: ComponentType[]) {
          for (let i = 0; i < list.length; i++) {
            const item = list[i];
            if (item.id == id) {
              list.splice(i, 1);
              delete state.page.elementsMap[id];

              // 递归删除相互引用的嵌套父子组件
              const deepRemove = (id: string) => {
                // 删除子组件
                Object.values(state.page.elementsMap).map((item: any) => {
                  if (item.parentId == id) {
                    delete state.page.elementsMap[item.id];
                    deepRemove(item.id);
                  }
                  return item;
                });
              };
              deepRemove(id);
              break;
            } else if (item.elements?.length) {
              deepFind(item.elements);
            }
          }
        }
        deepFind(state.page.elements);
        state.selectedElement = undefined;
      }),
    );
  },
  // 添加变量
  addVariable(payload: PageVariable) {
    set(
      produce((state) => {
        state.page.variables.push(payload);
      }),
    );
  },
  // 更新变量
  editVariable(payload: PageVariable) {
    set(
      produce((state) => {
        const index = state.page.variables.findIndex((item: PageVariable) => item.name == payload.name);
        if (index > -1) {
          state.page.variables[index] = payload;
        }
      }),
    );
  },
  // 删除变量
  removeVariable(name: string) {
    set(
      produce((state) => {
        state.page.variables = state.page.variables.filter((item: PageVariable) => item.name !== name);
      }),
    );
  },
  setVariableData({ name, value }: any) {
    set(
      produce((state) => {
        state.page.variableData[name] = value;
      }),
    );
  },
  setFormData({ name, value }: any) {
    set(
      produce((state) => {
        state.page.formData[name] = { ...state.page.formData[name], ...value };
      }),
    );
  },
  setInterceptor(payload: any) {
    set(
      produce((state) => {
        state.page.interceptor = payload;
      }),
    );
  },
  // 有些场景下，需要手工更新组件选中的工具条
  updateToolbar: () => {
    set((state) => {
      return {
        isUpdateToolbar: !state.isUpdateToolbar,
      };
    });
  },
  // 清除页面信息
  clearPageInfo() {
    set(
      produce((state) => {
        state.page = {
          pageId: 0,
          pageName: '',
          remark: '',
          stg_state: 1,
          pre_state: 1,
          prd_state: 1,
          user_id: '',
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
