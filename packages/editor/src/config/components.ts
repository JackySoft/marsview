/**
 * 组件配置列表
 */
export interface SysComItem {
  type: string;
  title: string;
  data: Array<{
    icon: string;
    name: string;
    type: string;
  }>;
}
const components = [
  {
    type: 'Scene',
    title: '场景组件',
    data: [
      {
        icon: '',
        name: '搜索表单',
        type: 'SearchForm',
      },
      {
        icon: '',
        name: '普通表格',
        type: 'MarsTable',
      },
    ],
  },
  {
    type: 'Layouts',
    title: '容器组件',
    data: [
      {
        icon: '',
        name: 'Flex容器',
        type: 'Flex',
      },
      {
        icon: '',
        name: 'Card容器',
        type: 'Card',
      },
      {
        icon: '',
        name: 'Form容器',
        type: 'Form',
      },
      {
        icon: '',
        name: 'Div容器',
        type: 'Div',
      },
    ],
  },
  {
    type: 'Form',
    title: '表单组件',
    data: [
      {
        icon: '',
        name: '文本框',
        type: 'Input',
      },
      {
        icon: '',
        name: '数字框',
        type: 'InputNumber',
      },
      {
        icon: '',
        name: '密码框',
        type: 'InputPassword',
      },
      {
        icon: '',
        name: '一次性密码框',
        type: 'InputOTP',
      },
      {
        icon: '',
        name: '下拉框',
        type: 'Select',
      },
      {
        icon: '',
        name: '日期',
        type: 'DatePicker',
      },
      {
        icon: '',
        name: '日期范围',
        type: 'DatePickerRange',
      },
      {
        icon: '',
        name: '单选框',
        type: 'Radio',
      },
      {
        icon: '',
        name: '多选框',
        type: 'CheckBox',
      },
      {
        icon: '',
        name: '开关',
        type: 'Switch',
      },
      {
        icon: '',
        name: '多行文本框',
        type: 'TextArea',
      },
      {
        icon: '',
        name: '时间框',
        type: 'TimePicker',
      },
      {
        icon: '',
        name: '时间范围框',
        type: 'TimePickerRange',
      },
      {
        icon: '',
        name: '分段选择器',
        type: 'Segmented',
      },
      {
        icon: '',
        name: '级联选择',
        type: 'Cascader',
      },
      {
        icon: '',
        name: '滑动条',
        type: 'Slider',
      },
      {
        icon: '',
        name: '树形选择',
        type: 'TreeSelect',
      },
      {
        icon: '',
        name: '上传',
        type: 'Upload',
      },
      {
        icon: '',
        name: '动态列表',
        type: 'FormList',
      },
      {
        icon: '',
        name: '编辑表格',
        type: 'EditTable',
      },
      {
        icon: '',
        name: '富文本',
        type: 'RichText',
      },
      {
        icon: '',
        name: '静态项',
        type: 'StaticItem',
      },
      {
        icon: '',
        name: '表单项',
        type: 'FormItem',
      },
    ],
  },
  {
    type: 'LayoutComp',
    title: '布局组件',
    data: [
      {
        icon: '',
        name: '间距',
        type: 'Space',
      },
      {
        icon: '',
        name: '分割线',
        type: 'Divider',
      },
      {
        icon: '',
        name: '行组件',
        type: 'Row',
      },
      {
        icon: '',
        name: '列组件',
        type: 'Col',
      },
    ],
  },
  {
    type: 'Echarts',
    title: '图表组件',
    data: [
      {
        icon: '',
        name: '饼图',
        type: 'PieChart',
      },
      {
        icon: '',
        name: '折线图',
        type: 'LineChart',
      },
      {
        icon: '',
        name: '柱状图',
        type: 'ColumnChart',
      },
      {
        icon: '',
        name: '条形图',
        type: 'BarChart',
      },
      {
        icon: '',
        name: '迷你折线图',
        type: 'TinyLine',
      },
      {
        icon: '',
        name: '迷你柱形图',
        type: 'TinyColumn',
      },
      {
        icon: '',
        name: '进度条',
        type: 'Progress',
      },
      {
        icon: '',
        name: '进度环图',
        type: 'RingProgress',
      },
    ],
  },
  {
    type: 'Functional',
    title: '功能组件',
    data: [
      {
        icon: '',
        name: '按钮',
        type: 'Button',
      },
      {
        icon: '',
        name: '文件上传',
        type: 'FileUpload',
      },
      {
        icon: '',
        name: 'List组件',
        type: 'List',
      },
      {
        icon: '',
        name: '描述列表',
        type: 'Descriptions',
      },

      {
        icon: '',
        name: '步骤条',
        type: 'Steps',
      },
      {
        icon: '',
        name: '标签页',
        type: 'Tabs',
      },
    ],
  },
  {
    type: 'FeedBack',
    title: '反馈组件',
    data: [
      {
        icon: '',
        name: '弹框',
        type: 'Modal',
      },
      {
        icon: '',
        name: '抽屉',
        type: 'Drawer',
      },
      {
        icon: '',
        name: '结果页',
        type: 'Result',
      },
      {
        icon: '',
        name: '空状态',
        type: 'Empty',
      },
    ],
  },
  {
    type: 'BasicComp',
    title: '基础组件',
    data: [
      {
        icon: '',
        name: '图片',
        type: 'Image',
      },
      {
        icon: '',
        name: '标题',
        type: 'Title',
      },
      {
        icon: '',
        name: '文本',
        type: 'Text',
      },
      {
        icon: '',
        name: '超链接',
        type: 'Link',
      },
      {
        icon: '',
        name: '统计数值',
        type: 'Statistic',
      },
      {
        icon: '',
        name: '倒计时',
        type: 'CountDown',
      },
      {
        icon: '',
        name: '图标',
        type: 'Icon',
      },
      {
        icon: '',
        name: '头像',
        type: 'Avatar',
      },
    ],
  },
  {
    type: 'MicroApp',
    title: '微服务',
    data: [
      {
        icon: '',
        name: 'IFrame',
        type: 'IFrame',
      },
    ],
  },
];

export default components;
