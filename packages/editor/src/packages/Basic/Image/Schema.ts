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
      type: 'InputPx',
      label: '图片宽度',
      name: 'width',
    },
    {
      type: 'InputPx',
      label: '图片高度',
      name: 'height',
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
      src: `${import.meta.env.VITE_CDN_URL}/mars-logo.png`,
      preview: false,
      width: '200px',
      height: '200px',
      alt: '',
    },
    // 组件样式
    style: {},
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
