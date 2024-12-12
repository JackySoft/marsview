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
      type: 'Select',
      label: '垂直对齐',
      name: 'align',
      props: {
        options: [
          { label: '顶部对齐', value: 'top' },
          { label: '居中对齐', value: 'middle' },
          { label: '底部对齐', value: 'bottom' },
          { label: '拉伸对齐', value: 'stretch' },
        ],
      },
    },
    {
      type: 'InputNumber',
      label: '间隔',
      name: 'gutter',
      props: {
        placeholder: '请输入间隔',
      },
    },
    {
      type: 'Select',
      label: '水平对齐',
      name: 'justify',
      props: {
        options: [
          { label: '起点对齐', value: 'start' },
          { label: '终点对齐', value: 'end' },
          { label: '居中对齐', value: 'center' },
          { label: '环绕对齐', value: 'space-around' },
          { label: '两端对齐', value: 'space-between' },
          { label: '均匀对齐', value: 'space-evenly' },
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
      align: 'top',
      gutter: 0,
      justify: 'start',
      wrap: true,
    },
    style: {},
    events: [],
    api: {},
    source: '',
  },
  // 组件事件
  events: [],
};
