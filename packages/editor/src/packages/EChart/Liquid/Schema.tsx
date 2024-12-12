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
      type: 'ColorPicker',
      label: '填充色',
      name: ['liquidStyle', 'fill'],
    },
    {
      type: 'Slider',
      label: '透明度',
      name: ['liquidStyle', 'fillOpacity'],
      props: {
        min: 0,
        max: 1,
        step: 0.1,
      },
    },
    {
      type: 'ColorPicker',
      label: '图形描边',
      name: ['liquidStyle', 'stroke'],
    },
    {
      type: 'InputNumber',
      label: '描边宽度',
      name: ['liquidStyle', 'lineWidth'],
    },
    {
      type: 'Slider',
      label: '描边透明度',
      name: ['liquidStyle', 'lineOpacity'],
      props: {
        min: 0,
        max: 1,
        step: 0.1,
      },
    },
    {
      type: 'Slider',
      label: '透明度',
      name: ['liquidStyle', 'opacity'],
      props: {
        min: 0,
        max: 1,
        step: 0.1,
      },
    },
    {
      type: 'Select',
      label: '形状',
      name: ['shape'],
      props: {
        options: [
          { label: '圆形', value: 'circle' },
          { label: '菱形', value: 'diamond' },
          { label: '三角形', value: 'triangle' },
          { label: '大头针', value: 'pin' },
          { label: '矩形', value: 'rect' },
        ],
      },
    },
    {
      type: 'ColorPicker',
      label: '外观颜色',
      name: ['color'],
    },
    {
      type: 'Title',
      label: '水波配置',
      key: 'WaveConfig',
    },
    {
      type: 'InputNumber',
      label: '水波个数',
      name: ['wave', 'count'],
    },
    {
      type: 'InputNumber',
      label: '水波长度',
      name: ['wave', 'length'],
    },
    {
      type: 'Title',
      label: '外框配置',
      key: 'OutlineConfig',
    },
    {
      type: 'InputNumber',
      label: '容器边框',
      name: ['outline', 'border'],
      tooltip: '外框容器的 border 宽度，默认为 2 像素',
    },
    {
      type: 'InputNumber',
      label: '间距',
      name: ['outline', 'distance'],
      tooltip: '外框容器和内部波形的间距，默认为 0 像素',
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
      shape: 'circle',
      outline: {
        border: 2,
        distance: 0,
      },
      wave: {
        count: 1,
        length: 200,
      },
      color: '#7d33ff',
    },
    // 组件样式
    style: {
      height: '160px',
    },
    api: {
      sourceType: 'json',
      source: 0.25,
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
