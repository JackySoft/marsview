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
      label: 'x轴字段',
      name: 'xField',
    },
    {
      type: 'Input',
      label: 'y轴字段',
      name: 'yField',
    },
    {
      type: 'Input',
      label: '分类字段',
      name: 'seriesField',
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
      type: 'Switch',
      label: '平滑曲线',
      name: 'smooth',
    },
    {
      type: 'ColorPicker',
      label: '填充色',
      name: ['lineStyle', 'fill'],
    },
    {
      type: 'Slider',
      label: '透明度',
      name: ['lineStyle', 'fillOpacity'],
      props: {
        min: 0,
        max: 1,
        step: 0.1,
      },
    },
    {
      type: 'ColorPicker',
      label: '图形描边',
      name: ['lineStyle', 'stroke'],
    },
    {
      type: 'InputNumber',
      label: '描边宽度',
      name: ['lineStyle', 'lineWidth'],
    },
    {
      type: 'Title',
      label: '标签配置',
    },
    {
      type: 'Switch',
      label: '显示文本',
      name: 'label',
    },
    {
      type: 'Title',
      label: '点配置',
    },
    {
      type: 'Select',
      label: '点形状',
      name: ['point', 'shape'],
      props: {
        options: [
          { label: '圆形', value: 'circle' },
          { label: '方形', value: 'square' },
          { label: '竖线', value: 'line' },
          { label: '菱形', value: 'diamond' },
          { label: '三角形', value: 'triangle' },
          { label: '倒三角', value: 'triangle-down' },
          { label: '六边形', value: 'hexagon' },
          { label: '蝴蝶结', value: 'bowtie' },
          { label: '打叉', value: 'cross' },
          { label: 'I符号', value: 'tick' },
          { label: '加号', value: 'plus' },
          { label: '减号', value: 'hyphen' },
        ],
      },
    },
    {
      type: 'Slider',
      label: '点大小',
      name: ['point', 'size'],
      props: {
        min: 0,
        max: 50,
        step: 1,
      },
    },
    {
      type: 'ColorPicker',
      label: '点颜色',
      name: ['point', 'style', 'fill'],
    },
    {
      type: 'Title',
      label: '图例配置',
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
      color: ['#9d5cff', '#FFAB3E', '#FADB1E', '#9ADB19', '#28C084', '#3CA2FF', '#1861EB', '#A24CF5', '#F32AA3', '#F11818'],
      xField: 'week',
      yField: 'value',
      seriesField: 'name',
      autoFit: true, // 图表自适应
      appendPadding: 20, // 图表内边距
      legend: {
        layout: 'horizontal',
        position: 'top',
      },
      label: {},
      point: {
        shape: 'circle',
        size: 5,
      },
    },
    // 组件样式
    style: {},
    api: {
      sourceType: 'json',
      source: [
        {
          week: '周一',
          value: 40,
          name: '微信',
        },
        {
          week: '周一',
          value: 45,
          name: 'Marsview',
        },
        {
          week: '周二',
          value: 65,
          name: '微信',
        },
        {
          week: '周二',
          value: 56,
          name: 'Marsview',
        },
        {
          week: '周三',
          value: 74,
          name: '微信',
        },
        {
          week: '周三',
          value: 82,
          name: 'Marsview',
        },
        {
          week: '周四',
          value: 88,
          name: '微信',
        },
        {
          week: '周四',
          value: 82,
          name: 'Marsview',
        },
        {
          week: '周五',
          value: 92,
          name: '微信',
        },
        {
          week: '周五',
          value: 85,
          name: 'Marsview',
        },
        {
          week: '周六',
          value: 80,
          name: '微信',
        },
        {
          week: '周六',
          value: 68,
          name: 'Marsview',
        },
        {
          week: '周日',
          value: 65,
          name: '微信',
        },
        {
          week: '周日',
          value: 58,
          name: 'Marsview',
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
