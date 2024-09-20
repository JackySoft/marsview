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
      type: 'InputNumber',
      label: '占位格数',
      name: 'span',
      props: {
        placeholder: '输入占位格数',
      },
    },
    {
      type: 'InputNumber',
      label: '偏移格数',
      name: 'offset',
      props: {
        placeholder: '左侧偏移格数',
      },
    },
    {
      type: 'InputNumber',
      label: '左拉格数',
      name: 'pull',
      props: {
        placeholder: '左侧偏移格数',
      },
    },
    {
      type: 'InputNumber',
      label: '右推格数',
      name: 'push',
      props: {
        placeholder: '右侧偏移格数',
      },
    },
  ],
  config: {
    // 组件默认属性值
    props: {
      span: 8,
    },
    style: {},
    events: [],
    api: {},
    source: '',
  },
  // 组件事件
  events: [],
};
