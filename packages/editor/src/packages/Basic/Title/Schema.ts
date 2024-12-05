/**
 * 组件配置和属性值
 */

export default {
  // 组件属性配置JSON
  attrs: [
    {
      type: 'Title',
      label: '基础配置',
      key: 'basic',
    },
    {
      type: 'TextArea',
      label: '标题内容',
      name: 'text',
    },
    {
      type: 'Select',
      label: '重要程度',
      name: 'level',
      props: {
        options: [
          { value: 1, label: 'H1' },
          { value: 2, label: 'H2' },
          { value: 3, label: 'H3' },
          { value: 4, label: 'H4' },
          { value: 5, label: 'H5' },
        ],
      },
    },
    {
      type: 'Select',
      label: '文本类型',
      name: 'type',
      props: {
        options: [
          { value: '', label: '默认' },
          { value: 'secondary', label: '弱提示' },
          { value: 'success', label: '成功提示' },
          { value: 'warning', label: '警告提示' },
          { value: 'danger', label: '错误提示' },
        ],
      },
    },
    {
      type: 'Switch',
      label: '代码格式',
      name: 'code',
    },
    {
      type: 'Switch',
      label: '删除线',
      name: 'delete',
    },
    {
      type: 'Switch',
      label: '禁用文本',
      name: 'disabled',
    },
    {
      type: 'Switch',
      label: '是否可复制',
      name: 'copyable',
    },
    {
      type: 'Switch',
      label: '标记格式',
      name: 'mark',
    },
    {
      type: 'Switch',
      label: '是否加粗',
      name: 'strong',
    },
    {
      type: 'Switch',
      label: '是否斜体',
      name: 'italic',
    },
    {
      type: 'Switch',
      label: '下划线',
      name: 'underline',
    },
  ],
  config: {
    // 组件默认属性值
    props: {
      text: '欢迎使用Marsview低代码系统',
      type: '',
      level: 1,
    },
    style: {
      margin: 0,
    },
    events: [],
    api: {},
    source: '',
  },
  // 组件事件
  events: [
    {
      value: 'onClick',
      name: '点击事件',
    },
  ],
  // 组件接口
  api: {},
};
