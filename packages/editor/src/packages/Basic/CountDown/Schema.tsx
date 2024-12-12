/**
 * 组件配置和属性值
 */

import TextSetting from '@/packages/components/TextSetting';

export default {
  // 组件属性配置JSON
  attrs: [
    {
      type: 'Title',
      label: '基础配置',
      key: 'basic',
    },
    {
      type: 'Input',
      label: '标题',
      name: 'title',
    },
    {
      type: 'Variable',
      label: '显示值',
      name: 'value',
    },
    {
      type: 'Input',
      label: '格式',
      name: 'format',
    },
    {
      type: 'Icons',
      label: '前缀',
      name: ['prefix'],
    },
    {
      type: 'Icons',
      label: '后缀',
      name: ['suffix'],
    },
    {
      type: 'function',
      label: '自定义渲染',
      key: 'render',
      render: () => {
        return <TextSetting key="render" label="自定义" name="script" />;
      },
    },
  ],
  config: {
    // 组件默认属性值
    props: {
      title: 'Countdown',
      value: Date.now() + 1000 * 60 * 60 * 24 * 2 + 1000 * 30,
      format: 'HH:mm:ss',
      script: `function render(value){
    return value;
}`,
    },
    style: {},
    events: [],
    api: {},
    source: '',
  },
  // 组件事件
  events: [
    {
      value: 'onChange',
      name: '变化事件',
    },
    {
      value: 'onFinish',
      name: '完成事件',
    },
  ],
  // 组件接口
  api: {},
};
