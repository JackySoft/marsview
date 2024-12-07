/**
 * 组件配置和属性值
 */
import ColorSet from '../components/ColorSet';
import RadiusSet from '../components/RadiusSet';
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
      type: 'Switch',
      label: '是否分组',
      name: 'isGroup',
    },
    {
      type: 'Switch',
      label: '是否堆叠',
      name: 'isStack',
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
      type: 'Slider',
      label: '宽度占比',
      name: 'columnWidthRatio',
      props: {
        min: 0,
        max: 1,
        step: 0.1,
      },
    },
    {
      type: 'Slider',
      label: '组内间距',
      name: ['dodgePadding'],
    },
    {
      type: 'Slider',
      label: '组外间距',
      name: ['intervalPadding'],
    },
    {
      type: 'function',
      label: '圆角',
      render() {
        return <RadiusSet key="radius" />;
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
      key: 'fillOpacity',
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
      label: '标签配置',
    },
    {
      type: 'Select',
      label: '位置',
      name: ['label', 'position'],
      key: 'labelPosition',
      props: {
        options: [
          { label: 'top', value: 'top' },
          { label: 'middle', value: 'middle' },
          { label: 'bottom', value: 'bottom' },
        ],
      },
    },
    {
      type: 'ColorPicker',
      label: '颜色',
      name: ['label', 'style', 'fill'],
    },
    {
      type: 'Slider',
      label: '透明度',
      key: 'labelOpacity',
      name: ['label', 'style', 'opacity'],
      props: {
        min: 0,
        max: 1,
        step: 0.1,
      },
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
      xField: 'project', // X 轴显示的字段
      yField: 'value', // Y 轴显示的字段
      columnWidthRatio: 0.6, // 柱子宽度占比
      isGroup: true,
      autoFit: true, // 图表自适应
      appendPadding: 20, // 图表内边距
      title: {
        visible: true,
        text: '多色饼图',
      },
      theme: 'default', // 主题
      color: ['#9d5cff', '#FFAB3E', '#FADB1E', '#9ADB19', '#28C084', '#3CA2FF', '#1861EB', '#A24CF5', '#F32AA3', '#F11818'],
      seriesField: 'type', // 分类字段
      isStack: false, // 是否堆叠
      isRange: false, // 是否区间柱状图
      isPercent: false, // 是否堆积百分比柱状图，isPercent 为 true 时，isStack 也需要为 true。
      // 图表文本配置
      label: {
        position: 'middle', // 'top', 'bottom', 'middle'
        style: {
          fill: '#FFFFFF',
          opacity: 0.8,
        },
      },
      // 图例配置
      legend: {
        layout: 'horizontal', // horizontal | vertical
        position: 'top', //'top', 'top-left', 'top-right', 'left', 'left-top', 'left-bottom', 'right', 'right-top', 'right-bottom', 'bottom', 'bottom-left', 'bottom-right'。
      },
      xAxis: {
        label: {
          autoHide: true,
          autoRotate: true,
        },
      },
      columnStyle: {
        fillOpacity: 1,
        radius: [0, 0, 0, 0],
      },
      // 图表交互
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
    // 数据源
    api: {
      sourceType: 'json',
      source: [
        {
          type: 'PV',
          project: '百度',
          value: 5000,
        },
        {
          type: 'UV',
          project: '百度',
          value: 800,
        },
        {
          type: 'PV',
          project: '字节跳动',
          value: 3000,
        },
        {
          type: 'UV',
          project: '字节跳动',
          value: 300,
        },
        {
          type: 'PV',
          project: '阿里',
          value: 30000,
        },
        {
          type: 'UV',
          project: '阿里',
          value: 10000,
        },
        {
          type: 'PV',
          project: '微信',
          value: 7000,
        },
        {
          type: 'UV',
          project: '微信',
          value: 5000,
        },
        {
          type: 'PV',
          project: 'Marsview',
          value: 50000,
        },
        {
          type: 'UV',
          project: 'Marsview',
          value: 35000,
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
