/**
 * 组件配置和属性值
 */
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
      type: 'ColorPicker',
      label: '颜色',
      name: ['color'],
    },
  ],
  config: {
    // 组件默认属性值
    props: {
      theme: 'default', // 主题
      autoFit: true, // 图表自适应
      appendPadding: 20, // 图表内边距
      smooth: true, // 折线平滑
      point: {
        shape: 'circle',
        size: 0,
      },
      lineStyle: {
        lineWidth: 2,
        fillOpacity: 1,
      },
      color: '#7d33ff',
    },
    // 组件样式
    style: {
      height: '80px',
    },
    api: {
      sourceType: 'json',
      source: [264, 417, 438, 887, 309, 397, 550, 575, 563, 430, 525, 592, 492, 467, 513, 546, 983, 340, 539, 243, 226, 192],
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
