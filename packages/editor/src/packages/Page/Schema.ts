/**
 * 页面配置和属性值
 */

export default {
  // 页面属性配置JSON
  attrs: [
    {
      key: 'PageSet',
      type: 'Title',
      label: '页面配置',
    },
    {
      key: 'PageName',
      type: 'ColorPicker',
      label: '主题色',
      name: ['theme'],
    },
  ],
  config: {
    props: {
      theme: '#1677ff',
    },
    style: {
      color: '#000',
      backgroundColor: '#fff',
      padding: '20px',
    },
    scopeCss: '',
    scopeStyle: {
      color: '#000',
      backgroundColor: '#fff',
      padding: '20px',
    },
    events: [],
    api: {
      sourceType: 'json',
      id: '',
      source: {},
      sourceField: '',
    },
  },
  // 组件事件
  events: [
    {
      value: 'onLoad',
      name: '初始化事件',
    },
  ],
};
