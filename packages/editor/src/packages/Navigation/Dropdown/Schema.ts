export default {
  attrs: [
    {
      type: 'Title',
      label: '基础设置',
    },
    {
      type: 'Input',
      label: '文本',
      name: 'text',
    },
    // {
    //   type: 'function'
    // }
  ],
  config: {
    // 组件默认属性值
    props: {
      text: 'Hover me',
      // closable: true,
      // footer: true,
      // open: true,
      // okText: '确定',
      // cancelText: '取消',
      // destroyOnClose: false,
      // confirmLoading: false,
    },
  },
  events: [
    {
      value: 'onLoad',
      name: '初始化事件',
    },
    {
      value: 'onOk',
      name: '确认事件',
    },
    {
      value: 'onCancel',
      name: '取消事件',
    },
  ],
}