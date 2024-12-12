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
      name: ['areaStyle', 'fill'],
    },
    {
      type: 'Slider',
      label: '透明度',
      name: ['areaStyle', 'fillOpacity'],
      props: {
        min: 0,
        max: 1,
        step: 0.1,
      },
    },
    {
      type: 'ColorPicker',
      label: '图形描边',
      name: ['areaStyle', 'stroke'],
    },
    {
      type: 'InputNumber',
      label: '描边宽度',
      name: ['areaStyle', 'lineWidth'],
    },
    {
      type: 'Title',
      label: '折线样式',
      key: 'lineStyle',
    },
    {
      type: 'ColorPicker',
      label: '填充色',
      name: ['line', 'color'],
    },
    {
      type: 'InputNumber',
      label: '大小',
      name: ['line', 'size'],
    },
    {
      type: 'Title',
      label: '数据点配置',
      key: 'DataPointStyle',
    },
    {
      type: 'ColorPicker',
      label: '点颜色',
      name: ['point', 'color'],
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
  ],
  config: {
    // 组件默认属性值
    props: {
      theme: 'default', // 主题
      autoFit: true, // 图表自适应
      appendPadding: 0, // 图表内边距
      smooth: true, // 折线平滑
      line: {
        color: '#7d33ff',
        size: 1,
      },
      areaStyle: {
        fill: '#7d33ff',
        fillOpacity: 0.3,
      },
      point: {
        color: '#7d33ff',
        size: 0,
      },
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
