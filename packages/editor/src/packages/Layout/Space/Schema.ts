/**
 * 组件配置和属性值
 */

export default {
  // 组件属性配置JSON
  attrs: [
    {
      type: 'Title',
      label: '基础配置',
      key: 'formItem',
    },
    {
      type: 'Switch',
      label: '紧凑模式',
      name: ['compact'],
    },
    {
      type: 'Select',
      label: '对齐方式',
      name: 'align',
      props: {
        options: [
          { label: '起点对齐', value: 'start' },
          { label: '终点对齐', value: 'end' },
          { label: '居中对齐', value: 'center' },
          { label: '基线对齐', value: 'baseline' },
        ],
      },
    },
    {
      type: 'Select',
      label: '间距方向',
      name: 'direction',
      props: {
        options: [
          { label: '垂直', value: 'vertical' },
          { label: '水平', value: 'horizontal' },
        ],
      },
    },
    {
      type: 'Select',
      label: '间距大小',
      name: ['size'],
      props: {
        options: [
          { label: '默认', value: 'small' },
          { label: '中等', value: 'middle' },
          { label: '大号', value: 'large' },
        ],
      },
    },
    {
      type: 'Switch',
      label: '自动换行',
      name: ['wrap'],
      tooltip: '仅在 horizontal 时有效',
    },
  ],
  config: {
    // 组件默认属性值
    props: {
      compact: false,
      align: 'center',
      direction: 'horizontal',
      size: 'middle',
      wrap: false,
    },
    style: {
      display: 'flex',
    },
    events: [],
    api: {},
    source: '',
  },
  // 组件事件
  events: [],
};
