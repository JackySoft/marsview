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
      type: 'Slider',
      label: '平滑曲线',
      name: 'columnWidthRatio',
      props: {
        min: 0,
        max: 1,
        step: 0.1,
      },
    },
    {
      type: 'ColorPicker',
      label: '填充色',
      name: ['columnStyle', 'fill'],
    },
    {
      type: 'Slider',
      label: '透明度',
      name: ['columnStyle', 'fillOpacity'],
      props: {
        min: 0,
        max: 1,
        step: 0.1,
      },
    },
    {
      type: 'ColorPicker',
      label: '图形描边',
      name: ['columnStyle', 'stroke'],
    },
    {
      type: 'InputNumber',
      label: '描边宽度',
      name: ['columnStyle', 'lineWidth'],
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
      source: [274, 337, 81, 497, 666, 219, 269],
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
