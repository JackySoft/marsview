/**
 * 组件配置和属性值
 */
import ColorSet from '../components/ColorSet';
export default {
  // 组件属性配置JSON
  attrs: [
    {
      type: 'Title',
      label: '基础属性',
    },
    {
      type: 'Switch',
      label: '自适应',
      name: 'autoFit',
    },
    {
      type: 'InputNumber',
      label: '图表内边距',
      name: 'appendPadding',
    },
    {
      type: 'Title',
      label: '图形样式',
    },
    {
      type: 'Slider',
      label: '外环半径',
      name: 'radius',
      props: {
        min: 0,
        max: 1,
        step: 0.05,
      },
    },
    {
      type: 'Slider',
      label: '内环半径',
      name: 'innerRadius',
      props: {
        min: 0,
        max: 1,
        step: 0.05,
      },
    },
    {
      type: 'Title',
      label: '主题配置',
    },
    {
      type: 'Select',
      label: '主题',
      name: 'theme',
      props: {
        options: [
          { label: '默认', value: 'default' },
          { label: '暗黑', value: 'dark' },
        ],
      },
    },
    {
      type: 'function',
      label: '图形颜色',
      name: 'color',
      render() {
        return <ColorSet key="ColorSet" />;
      },
    },
  ],
  config: {
    // 组件默认属性值
    props: {
      theme: 'default', // 主题
      autoFit: true, // 图表自适应
      appendPadding: 0, // 图表内边距
      innerRadius: 0.85,
      radius: 1,
      color: ['#9d5cff', '#E8EDF3'],
    },
    // 组件样式
    style: {
      display: 'inline-block',
      height: '80px',
    },
    api: {
      sourceType: 'json',
      source: 0.7,
    },
  },
  // 组件事件
  events: [],
  methods: [
    {
      name: 'update',
      title: '更新数据',
    },
  ],
};
