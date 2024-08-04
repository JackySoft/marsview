/**
 * 组件配置和属性值
 */

export default {
  // 组件属性配置JSON
  attrs: [
    {
      type: 'Title',
      label: '基础设置',
      key: 'basic',
    },
    {
      type: 'Switch',
      label: '显示虚线',
      name: ['dashed'],
    },
    {
      type: 'Input',
      label: '显示文本',
      name: ['text'],
    },
    {
      type: 'Switch',
      label: '普通文本',
      name: ['plain'],
    },
    {
      type: 'Select',
      label: '标题位置',
      name: ['orientation'],
      props: {
        options: [
          { value: 'left', label: '左边' },
          { value: 'right', label: '右边' },
          { value: 'center', label: '中间' },
        ],
      },
    },
    {
      type: 'Select',
      label: '显示类型',
      name: ['type'],
      props: {
        options: [
          { value: 'horizontal', label: '水平' },
          { value: 'vertical', label: '垂直' },
        ],
      },
    },
  ],
  config: {
    // 组件默认属性值
    props: {
      text: '',
    },
    // 组件样式
    style: {},
    // 事件
    events: [],
  },
  // 组件事件
  events: [
    {
      value: 'onClick',
      name: '点击事件',
    },
  ],
  methods: [
    {
      name: 'startLoading',
      title: '开始loading',
    },
    {
      name: 'endLoading',
      title: '结束loading',
    },
  ],
};
