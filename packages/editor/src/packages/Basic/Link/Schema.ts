/**
 * 组件配置和属性值
 */

export default {
  // 组件属性配置JSON
  attrs: [
    {
      type: 'Title',
      label: '基础配置',
      key: 'basic',
    },
    {
      type: 'TextArea',
      label: '文本内容',
      name: 'text',
    },
    {
      type: 'Input',
      label: '跳转链接',
      name: 'href',
    },
    {
      type: 'Select',
      label: '跳转位置',
      name: 'target',
      props: {
        options: [
          { value: '_self', label: '当前页面加载（默认）' },
          { value: '_blank', label: '打开新页签' },
          { value: '_parent', label: '父窗口打开' },
          { value: '_top', label: '最顶级窗口打开' },
        ],
      },
    },
  ],
  config: {
    // 组件默认属性值
    props: {
      text: '打开Marsview系统',
      href: 'https://www.marsview.com.cn',
      target: '_blank',
    },
    style: {},
    events: [],
    api: {},
    source: '',
  },
  // 组件事件
  events: [
    {
      value: 'onClick',
      name: '点击事件',
    },
  ],
  // 组件接口
  api: {},
};
