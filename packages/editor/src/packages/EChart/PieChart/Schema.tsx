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
      type: 'Input',
      label: '扇形值字段',
      name: 'angleField',
      props: {
        placeholder: '扇形（弧度）对应值',
      },
    },
    {
      type: 'Input',
      label: '分类字段',
      name: 'colorField',
      props: {
        placeholder: '扇形分类名称',
      },
    },
    {
      type: 'Slider',
      label: '饼图半径',
      name: 'radius',
      props: {
        min: 0,
        max: 1,
        step: 0.1,
      },
    },
    {
      type: 'Slider',
      label: '内环半径',
      name: 'innerRadius',
      props: {
        min: 0,
        max: 1,
        step: 0.1,
      },
    },
    {
      type: 'InputNumber',
      label: '图表内边距',
      name: 'padding',
    },
    {
      type: 'Title',
      label: '标签配置',
      key: 'label',
    },
    {
      type: 'Select',
      label: '标签位置',
      name: ['label', 'type'],
      props: {
        options: [
          { label: '内部', value: 'inner' },
          { label: '外部', value: 'outer' },
          { label: '蜘蛛布局', value: 'spider' },
        ],
      },
    },
    {
      type: 'InputNumber',
      label: '字体大小',
      name: ['label', 'style', 'fontSize'],
      props: {
        placeholder: '数字类型',
      },
    },
    {
      type: 'Select',
      label: '字重',
      name: ['label', 'style', 'fontWeight'],
      props: {
        options: [
          {
            value: 'normal',
            label: 'normal',
          },
          {
            value: 'bold',
            label: 'bold',
          },
          {
            value: 'lighter',
            label: 'lighter',
          },
          {
            value: 'bolder',
            label: 'bolder',
          },
        ],
      },
    },
    {
      type: 'Input',
      label: '标签渲染',
      name: ['label', 'content'],
      props: {
        placeholder: '自定义渲染',
      },
    },
    {
      type: 'Title',
      label: '图例配置',
      key: 'legend',
    },
    {
      type: 'Select',
      label: '布局',
      name: ['legend', 'layout'],
      props: {
        options: [
          { label: '水平', value: 'horizontal' },
          { label: '垂直', value: 'vertical' },
        ],
      },
    },
    {
      type: 'Select',
      label: '位置',
      name: ['legend', 'position'],
      key: 'legendPosition',
      props: {
        allowClear: true,
        options: [
          { label: 'top', value: 'top' },
          { label: 'top-left', value: 'top-left' },
          { label: 'top-right', value: 'top-right' },
          { label: 'left', value: 'left' },
          { label: 'left-top', value: 'left-top' },
          { label: 'left-bottom', value: 'left-bottom' },
          { label: 'right', value: 'right' },
          { label: 'right-top', value: 'right-top' },
          { label: 'right-bottom', value: 'right-bottom' },
          { label: 'bottom', value: 'bottom' },
          { label: 'bottom-left', value: 'bottom-left' },
          { label: 'bottom-right', value: 'bottom-right' },
        ],
      },
    },
    {
      type: 'Title',
      label: '内环配置',
    },
    {
      type: 'Input',
      label: '内环标题',
      name: ['statistic', 'title', 'content'],
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
      angleField: 'count',
      colorField: 'name',
      radius: 1,
      innerRadius: 0,
      autoFit: true, // 图表自适应
      appendPadding: 20, // 图表内边距
      label: {
        type: 'outer',
        content: '{value} 人',
        style: {
          fontSize: 12,
          fontWeight: 'normal',
        },
      },
      legend: {
        layout: 'vertical',
        position: 'right',
      },
      theme: 'default', // 主题
      color: ['#9d5cff', '#FFAB3E', '#FADB1E', '#9ADB19', '#28C084', '#3CA2FF', '#1861EB', '#A24CF5', '#F32AA3', '#F11818'],
      interactions: [
        {
          type: 'element-active',
        },
        {
          type: 'pie-legend-active',
        },
      ],
    },
    // 组件样式
    style: {},
    api: {
      sourceType: 'json',
      source: [
        {
          name: '前端组',
          count: 10,
        },
        {
          name: '后端组',
          count: 18,
        },
        {
          name: '测试组',
          count: 23,
        },
        {
          name: '产品组',
          count: 19,
        },
        {
          name: '设计组',
          count: 15,
        },
      ],
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
