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
      type: 'Variable',
      label: '远程地址',
      name: 'src',
    },
    {
      type: 'Input',
      label: '显示标题',
      name: 'title',
    },
    {
      type: 'Title',
      label: '内容裁剪',
      key: 'clip',
    },
    {
      type: 'InputPx',
      label: '顶部裁剪',
      name: ['clip', 'top'],
    },
  ],
  config: {
    // 组件默认属性值
    props: {
      src: 'https://juejin.cn/',
      title: 'IFrame组件',
      clip: {
        top: '0px',
      },
    },
    style: {
      position: 'relative',
      overflow: 'hidden',
      border: '5px solid #7d33ff',
      width: '100%',
      height: '600px',
    },
    events: [],
    api: {},
    source: '',
  },
  // 组件事件
  events: [],
  // 组件接口
  api: {},
};
