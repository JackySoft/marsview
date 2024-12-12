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
      type: 'Switch',
      label: '垂直布局',
      name: 'vertical',
    },
    {
      type: 'Select',
      label: '换行方式',
      name: 'wrap',
      props: {
        options: [
          { value: 'nowrap', label: '不换行' },
          { value: 'wrap', label: '换行' },
          { value: 'wrap-reverse', label: '逆换行' },
        ],
      },
    },
    {
      type: 'Select',
      label: '主轴对齐',
      name: 'justify',
      props: {
        options: [
          { value: 'flex-start', label: '左对齐' },
          { value: 'flex-end', label: '右对齐' },
          { value: 'center', label: '居中对齐' },
          { value: 'space-between', label: '两端对齐' },
          { value: 'space-around', label: '环绕对齐' },
          { value: 'space-evenly', label: '均匀对齐' },
        ],
      },
    },
    {
      type: 'Select',
      label: '副轴对齐',
      name: 'align',
      props: {
        options: [
          { value: 'start', label: '起点对齐' },
          { value: 'end', label: '终点对齐' },
          { value: 'center', label: '居中对齐' },
          { value: 'baseline', label: '文字基线对齐' },
          { value: 'stretch', label: '拉伸对齐' },
        ],
      },
    },
    {
      type: 'InputPx',
      label: '元素间隙',
      name: 'gap',
      props: {
        placeholder: 'eg: 10',
      },
    },
  ],
  config: {
    // 组件默认属性值
    props: {
      vertical: false,
      wrap: 'nowrap',
      justify: 'center',
      align: 'center',
      gap: 10,
    },
    style: {},
    events: [],
    api: {},
    source: '',
  },
  // 组件事件
  events: [],
};
