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
      key: 'baseConfig',
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
      type: 'Slider',
      label: '外环半径',
      name: ['radius'],
      props: {
        min: 0,
        max: 1,
        step: 0.1,
      },
    },
    {
      type: 'Slider',
      label: '内环半径',
      name: ['innerRadius'],
      props: {
        min: 0,
        max: 1,
        step: 0.1,
      },
    },
    {
      type: 'Title',
      label: '图形样式',
      key: 'rangeConfig',
    },
    {
      type: 'Input',
      label: '弧形分段',
      name: ['range', 'ticks'],
      tooltip: '辅助圆弧分段显示，数组格式，逗号分割，0-1区间，支持比例：1/3',
    },
    {
      type: 'function',
      label: '圆弧颜色',
      render() {
        return <ColorSet key="ColorSet" name={['range', 'color']} />;
      },
    },
    {
      type: 'Title',
      label: '刻度配置',
      key: 'meterConfig',
    },
    {
      type: 'Select',
      label: '展示类型',
      name: ['type'],
      props: {
        options: [
          { label: '默认', value: '' },
          { label: '米', value: 'meter' },
        ],
      },
    },
    {
      type: 'InputNumber',
      label: '步数',
      name: ['meter', 'steps'],
      tooltip: '总步数，展示类型为米时生效',
    },
    {
      type: 'Slider',
      label: '间隙',
      name: ['meter', 'stepRatio'],
      props: {
        min: 0,
        max: 1,
        step: 0.1,
      },
    },
    {
      type: 'InputNumber',
      label: '子刻度个数',
      name: ['axis', 'subTickLine', 'count'],
    },
    {
      type: 'function',
      label: 'formatter',
      key: 'TickRender',
      render: () => {
        return <TextSetting key="render" label="刻度文本" name={['axis', 'label', 'formatter']} />;
      },
    },
    {
      type: 'Title',
      label: '文本配置',
      key: 'TextConfig',
    },
    {
      type: 'InputNumber',
      label: '字体大小',
      name: ['statistic', 'content', 'style', 'fontSize'],
    },
    {
      type: 'ColorPicker',
      label: '字体颜色',
      name: ['statistic', 'content', 'style', 'color'],
    },
    {
      type: 'function',
      label: 'formatter',
      key: 'TextRender',
      render: () => {
        return <TextSetting key="render" label="指示器文本" name={['statistic', 'content', 'formatter']} />;
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
      appendPadding: 10, // 图表内边距
      radius: 0.95,
      innerRadius: 0.9,
      range: {
        ticks: [0, 0.3, 0.6, 1],
        color: ['#7d33ff', '#FAAD14', '#30BF78'],
      },
      type: 'meter',
      meter: {
        steps: 1,
        stepRatio: 0.1,
      },
      axis: {
        subTickLine: {
          count: 3,
        },
        label: {
          formatter: `function render(value){
    return value * 100;
}`,
        },
      },
      statistic: {
        content: {
          formatter: `function render({ percent }){
    return (percent*100).toFixed(0) + '%';
}`,
          style: {
            fontSize: 24,
          },
        },
      },
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
