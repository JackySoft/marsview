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
      label: '标题',
      name: 'title',
    },
    {
      type: 'Switch',
      label: '悬浮效果',
      name: 'hoverable',
    },
    {
      type: 'Switch',
      label: '显示边框',
      name: 'bordered',
    },
    {
      type: 'Select',
      label: '卡片尺寸',
      name: 'size',
      props: {
        options: [
          { label: '默认', value: 'default' },
          { label: '小', value: 'small' },
        ],
      },
    },
    {
      type: 'Title',
      label: '按钮配置（右上角）',
      key: 'btnConfig',
    },
    {
      type: 'Input',
      label: '按钮名称',
      name: ['extra', 'text'],
    },
    {
      type: 'Select',
      label: '按钮类型',
      name: ['extra', 'type'],
      props: {
        options: [
          { label: '默认', value: 'default' },
          { label: '主要', value: 'primary' },
          { label: '幽灵', value: 'ghost' },
          { label: '链接', value: 'link' },
          { label: '文本', value: 'text' },
        ],
      },
    },
    {
      type: 'Switch',
      label: '显示危险',
      name: ['extra', 'danger'],
    },
    {
      type: 'Title',
      label: '封面配置',
      key: 'coverConfig',
    },
    {
      type: 'Input',
      label: '图片地址',
      name: 'cover',
    },
    {
      type: 'Title',
      label: 'Meta配置',
      key: 'metaConfig',
    },
    {
      type: 'Input',
      label: '头像地址',
      name: 'avatar',
    },
    {
      type: 'Input',
      label: '标题',
      name: ['meta', 'title'],
    },
    {
      type: 'Input',
      label: '描述',
      name: ['meta', 'description'],
    },
  ],
  config: {
    // 组件默认属性值
    props: {
      title: {
        type: 'static',
        value: 'Marsview搭建',
      },
      size: 'default',
      bordered: true,
      extra: {
        text: '更多',
        type: 'link',
      },
      meta: {
        title: '低代码搭建平台',
        description: '全栈自研、低代码搭建、逻辑编排、权限控制',
      },
    },
    // 组件样式
    style: {},
  },
  // 组件事件
  events: [
    {
      value: 'onClick',
      name: '点击卡片事件',
    },
    {
      value: 'onClickMore',
      name: '点击更多事件',
    },
  ],
};
