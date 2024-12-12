/**
 * 组件配置和属性值
 */
import ColorSet from '../components/ColorSet';
import TextSetting from '@/packages/components/TextSetting';
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
      label: '标签配置',
      key: 'metaConfig',
    },
    {
      type: 'Input',
      label: '字段',
      name: ['meta', 'field'],
      tooltip: '需要格式化的字段映射',
    },
    {
      type: 'Input',
      label: '别名',
      name: ['meta', 'alias'],
      tooltip: '格式化的字段别名，仅在单个分组下支持',
    },
    {
      type: 'function',
      label: 'formatter',
      key: 'MetaRender',
      render: () => {
        return <TextSetting key="render" label="格式化" name={['meta', 'formatter']} />;
      },
    },
    {
      type: 'Title',
      label: '图形样式',
    },
    {
      type: 'Slider',
      label: '雷达半径',
      name: 'radius',
      props: {
        min: 0,
        max: 1,
        step: 0.1,
      },
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
      key: 'pointConfig',
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
      name: ['point', 'color'],
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
      seriesField: 'type',
      appendPadding: 10,
      autoFit: true,
      meta: {
        field: 'value',
        alias: '',
        formatter: `function render(value){
    return value + '次';
}`,
      },
      radius: 1,
      point: {
        size: 2,
      },
      area: {},
      color: ['#9d5cff', '#FFAB3E', '#FADB1E', '#9ADB19', '#28C084', '#3CA2FF', '#1861EB', '#A24CF5', '#F32AA3', '#F11818'],
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
          value: 50000,
        },
        {
          type: 'UV',
          project: '百度',
          value: 45000,
        },
        {
          type: 'PV',
          project: '字节跳动',
          value: 50000,
        },
        {
          type: 'UV',
          project: '字节跳动',
          value: 48000,
        },
        {
          type: 'PV',
          project: '阿里',
          value: 45000,
        },
        {
          type: 'UV',
          project: '阿里',
          value: 42000,
        },
        {
          type: 'PV',
          project: '微信',
          value: 60000,
        },
        {
          type: 'UV',
          project: '微信',
          value: 45000,
        },
        {
          type: 'PV',
          project: 'Marsview',
          value: 60000,
        },
        {
          type: 'UV',
          project: 'Marsview',
          value: 65000,
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
