/**
 * 可拖拽的目标组件
 * @param icon 组件图片
 * @param name 组件中文名称
 * @param type 组件类型
 * @returns 拖拽对象
 */
export interface IDragTarget {
  icon?: React.ReactNode | string;
  name: string;
  type: string;
}
/**
 * 拖拽的
 * @param text 组件中文名称
 * @returns 拖拽对象
 */
export interface IDragTargetItem {
  id: string;
  type: string;
  name: string;
}
/**
 * 组件最小颗粒度类型定义
 */
export interface ComItemType {
  id: string;
  type: string;
  name: string | number;
  parentId?: string;
  elements: ComItemType[];
  remoteUrl?: string;
  remoteConfigUrl?: string;
  remoteCssUrl?: string;
}
/**
 * stor中状态对应的组件类型，这是原始的组件类型
 * @param {string} id 组件ID(算法生成)
 * @param {string} type 组件类型，枚举值
 * @param {string} parentId 父组件ID
 * @param {config} config 组件配置
 * @param {events} api 组件自带的事件
 * @param {elements} elements 子组件
 */
export type ComponentType<T = any> = {
  id: string;
  type: string;
  name: string;
  remoteUrl?: string;
  remoteConfigUrl?: string;
  remoteCssUrl?: string;
  parentId?: string;
  config: ConfigType<T>;
  // 属性中用于展示的事件，跟配置中的事件不同
  events?: Array<{ name: string; value: string }>;
  // 属性中用于展示的方法，跟配置中的方法不同
  methods: ComponentMethodType[];
  apis: { [key: string]: ApiType };
  elements: ComponentType<T>[];
} & OnProps<string>;

type OnProps<TKeys extends string> = {
  [P in `on${TKeys}` as `on${TKeys}`]: (data?: any) => void;
};

/**
 * 组件配置类型
 */
export interface ConfigType<T = any> {
  props: T; // 组件自身属性
  scopeCss: string; // 自定义css
  scopeStyle: React.CSSProperties; // 配置的style
  style: React.CSSProperties; // 合并后的样式
  events: EventType[]; //事件配置
  // 接口配置
  api: ApiConfig;
}

/**
 * 组件API简化类型
 */
export interface ApiConfig {
  sourceType: 'json' | 'api' | 'variable' | 'download';
  id: string;
  source: any;
  sourceField: string | { type: 'variable' | 'static'; value: string };
  name?: {
    type: 'variable' | 'static';
    value: string;
  };
}

/**
 * 事件类型
 */
export interface EventType<T = any> {
  nickName: string; // 中文名称
  eventName: string; // 英文标识
  actions: T[]; // 事件行为
}

/**
 * 事件行为
 */
export interface ActionNode<T> {
  action: T;
  next: (ActionNode<T> & { success: ActionNode<T>; fail: ActionNode<T> }) | null;
}

/**
 * 组件方法行为
 */
export interface MethodsAction {
  name: string;
  target: string;
  method: string;
  params?: { [key: string]: string | number };
}

/**
 * 确认框行为
 */
export interface ConfirmAction {
  name: string; // 行为名称
  type: 'confirm' | 'info' | 'success' | 'error' | 'warning'; // 行为类型
  title: string;
  content: string;
  okText: string;
  cancelText: string;
}

/**
 * 确认框行为
 */
export interface MessageAction {
  type: 'info' | 'success' | 'error' | 'warning'; // 行为类型
  content: string;
  duration: number;
}

/**
 * 通知行为
 */
export interface NotificationAction {
  type: 'info' | 'success' | 'error' | 'warning'; // 行为类型
  message: string;
  description: string;
  placement: 'top' | 'topLeft' | 'topRight' | 'bottom' | 'bottomLeft' | 'bottomRight';
  duration: number;
}

export interface ComponentMethodParams {
  name: string;
  title: string;
  required: boolean;
  type: 'select' | 'input';
  options?: Array<{ label: string; value: string }>;
}

/**
 * 组件方法类型
 */
export interface ComponentMethodType {
  name: string;
  title: string;
  params: ComponentMethodParams[];
}

/**
 * 跳转行为
 */
export interface JumpLinkAction {
  url: string;
  jumpType: 'route' | 'micro' | 'link';
  isNewWindow: boolean;
}

/**
 * 变量赋值
 */

export interface VariableAction {
  assignmentType: 'assignment' | 'reset';
  assignmentWay: 'static' | 'dynamic';
  name: string;
  value: any;
}

/**
 * 内容复制
 */

export interface CopyAction {
  content: string;
}

/**
 * 接口类型定义
 */
export interface ApiType {
  id: string;
  name: string; //接口名称
  url: string;
  stgApi: string;
  preApi: string;
  prdApi: string;
  method: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';
  sourceType?: string; //数据源类型，枚举值
  // 静态数据源映射
  source: any;
  // 数据源映射，比如：{ code: { list: [] } }，这里sourceField: 'data.list'
  sourceField: string;
  contentType: string;
  baseApi?: string;
  sendOn?: string;
  replaceData: 'merge' | 'cover' | 'reserve';
  params?: {
    [key: string]: any;
  };
  isCors: boolean;
  // 字段映射
  result: {
    code: string; //状态码字段
    codeValue: number; //成功对应的值
    data: string; //结果字段
    msg: string; //报错字段
  };
  tips?: {
    success: string;
    fail: string;
    isSuccess: boolean; // 是否开启系统成功提示
    isError: boolean; // 是否开启系统错误提示
  };
}

/**
 * 请求响应接口类型
 * @param {number} code 状态码
 * @param {any} data 响应数据
 * @param {string} message 响应消息
 */
export interface ApiResponse {
  code: number;
  data: any;
  message: string;
}

/**
 * 页面变量类型
 */
export interface PageVariable {
  name: string;
  defaultValue: any;
  type: any;
  remark: string;
}

// 面板配置表单类型
export enum FormType {
  Title = 'Title',
  ColorPicker = 'ColorPicker',
  Collapse = 'Collapse',
  Panel = 'Panel',
  Input = 'Input',
  InputPx = 'InputPx',
  TextArea = 'TextArea',
  InputSelect = 'InputSelect',
  Switch = 'Switch',
  InputNumber = 'InputNumber',
  Select = 'Select',
  FormList = 'FormList',
  Button = 'Button',
  Card = 'Card',
  Upload = 'Upload',
  Radio = 'Radio',
  RadioGroup = 'RadioGroup',
  MonacoEditor = 'MonacoEditor',
  DatePicker = 'DatePicker',
  function = 'function',
  Slider = 'Slider',
  Variable = 'Variable',
  Icons = 'Icons',
}

/**
 * 设置器中渲染的组件类型
 */
export interface SchemaType {
  // 组件类型
  type: FormType;
  // 组件Key
  key: string;
  // 组件FormItem样式
  style?: React.CSSProperties;
  // 组件FormItem文本
  label?: string;
  // 组件form对象
  name?: (string | number)[];
  // tooltips
  tooltip?: string;
  popover?: {
    title: string;
    content: string | React.ReactNode;
    placement: 'top' | 'left' | 'right' | 'bottom';
  };
  // link
  link?: {
    url: string;
    label: string;
  };
  // Switch节点值
  valuePropName?: string;
  // 表单验证规则
  rules?: any;
  // 表单属性，非FormItem属性
  props?: any;
  // 子节点
  children?: SchemaType[];
  // 渲染函数
  render?: (props?: any) => React.ReactNode;
}
