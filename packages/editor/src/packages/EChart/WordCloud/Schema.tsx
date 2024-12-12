/**
 * 组件配置和属性值
 */
import ColorSet from '../components/ColorSet';
export default {
  // 组件属性配置JSON
  attrs: [
    {
      type: 'Title',
      label: '字段映射',
    },
    {
      type: 'Input',
      label: '单词字段',
      name: 'wordField',
    },
    {
      type: 'Input',
      label: '权重字段',
      name: 'weightField',
    },
    {
      type: 'Input',
      label: '颜色字段',
      name: 'colorField',
    },
    {
      type: 'Select',
      label: '词云形状',
      name: 'spiral',
      props: {
        options: [
          { label: '椭圆', value: 'archimedean' },
          { label: '矩形', value: 'rectangular' },
        ],
      },
    },
    {
      type: 'Title',
      label: '图形样式',
    },
    {
      type: 'Input',
      label: '词云图片',
      name: ['imageMask'],
      tooltip: '词云根据图片地址进行渲染，地址可以是url地址或base64编码',
    },
    {
      type: 'Input',
      label: '字体',
      name: ['wordStyle', 'fontFamily'],
    },
    {
      type: 'Select',
      label: '字重',
      name: ['wordStyle', 'fontWeight'],
      props: {
        options: [
          {
            value: 100,
            label: '100 Thin',
          },
          {
            value: 200,
            label: '200 Extra Light',
          },
          {
            value: 300,
            label: '300 Light',
          },

          {
            value: 400,
            label: '400 Normal',
          },
          {
            value: 500,
            label: '500 Medium',
          },
          {
            value: 600,
            label: '600 Semi Bold',
          },
          {
            value: 700,
            label: '700 Bold',
          },
          {
            value: 800,
            label: '800 Extra Bold',
          },
          {
            value: 900,
            label: '900 Black Bold',
          },
        ],
      },
    },
    {
      type: 'Slider',
      label: '字体大小',
      name: ['wordStyle', 'fontSize'],
      props: {
        min: 8,
        max: 32,
        step: 1,
      },
    },
    {
      type: 'Title',
      label: '图表配置',
      key: 'chartConfig',
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
      wordField: 'name',
      weightField: 'value',
      colorField: 'name',
      wordStyle: {
        fontFamily: 'Verdana',
        fontSize: [8, 32],
      },
      color: ['#7d33ff', '#E414E4', '#FF7A45', '#FFC53D', '#FFC53D', '#FF7A45', '#E414E4', '#7d33ff'],
    },
    // 组件样式
    style: {
      height: '100px',
    },
    api: {
      sourceType: 'json',
      source: [
        {
          name: 'Marsview',
          value: 100,
        },
        {
          name: 'Turing',
          value: 80,
        },
        {
          name: 'Alibaba',
          value: 60,
        },
        {
          name: 'Tencent',
          value: 40,
        },
        {
          name: 'Baidu',
          value: 20,
        },
        {
          name: 'LowCode',
          value: 70,
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
