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
      tooltip: '图标大小和颜色可在样式中修改字体颜色和大小',
    },
    {
      type: 'Icons',
      label: '图标',
      name: 'icon',
    },
    {
      type: 'InputNumber',
      label: '旋转角度',
      name: 'rotate',
    },
    {
      type: 'Switch',
      label: '旋转动画',
      name: 'spin',
    },
  ],
  config: {
    // 组件默认属性值
    props: {
      icon: 'GithubOutlined',
      rotate: 0,
      spin: false,
    },
    // 组件样式
    style: {
      fontSize: 24,
    },
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
