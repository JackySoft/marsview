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
      type: 'Input',
      label: '图片地址',
      name: 'src',
    },
    {
      type: 'Switch',
      label: '是否预览',
      name: 'preview',
    },
  ],
  config: {
    // 组件默认属性值
    props: {
      src: 'https://marsview.cdn.bcebos.com/s1.png',
      preview: false,
      alt: '',
    },
    // 组件样式
    style: {
      width: '200px',
      height: '200px',
    },
  },
  // 组件事件
  events: [
    {
      value: 'handleClick',
      name: '点击事件',
    },
  ],
  // 组件接口
  api: {},
};
