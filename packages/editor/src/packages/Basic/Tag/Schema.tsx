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
      type: 'Variable',
      label: '标签文本',
      name: 'text',
    },
    {
      type: 'ColorPicker',
      name: 'color',
      label: '标签颜色',
    },
    {
      type: 'Switch',
      label: '显示关闭',
      name: 'closable',
    },
    {
      type: 'Switch',
      label: '显示边框',
      name: 'bordered',
    },
    {
      type: 'Select',
      label: '标签状态',
      name: 'status',
      tooltip: '注意：标签状态和标签颜色只能选择一个',
      props: {
        options: [
          { value: '', label: '无状态' },
          { value: 'default', label: '默认状态' },
          { value: 'success', label: '成功状态' },
          { value: 'processing', label: '进行中状态' },
          { value: 'error', label: '报错状态' },
          { value: 'warning', label: '警告状态' },
        ],
      },
    },
    {
      type: 'Icons',
      label: '标签图标',
      name: ['icon'],
    },
  ],
  config: {
    // 组件默认属性值
    props: {
      text: '标签',
      status: 'success',
      closable: false,
      bordered: true,
      icon: 'CheckCircleOutlined',
    },
    style: {},
    events: [],
    api: {},
    source: '',
  },
  // 组件事件
  events: [
    {
      value: 'onClose',
      name: '点击关闭事件',
    },
  ],
  // 组件接口
  api: {},
};
