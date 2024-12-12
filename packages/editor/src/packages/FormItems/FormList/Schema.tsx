/**
 * 组件配置和属性值
 */
export default {
  // 组件属性配置JSON
  attrs: [
    {
      type: 'Title',
      label: '表单配置',
      key: 'formWrap',
    },
    {
      type: 'Input',
      label: '字段',
      name: ['formItem', 'name'],
      props: {
        placeholder: '请输入提交字段',
      },
    },
    {
      type: 'Switch',
      label: '无样式',
      name: ['formItem', 'noStyle'],
    },
  ],
  config: {
    props: {
      formItem: {
        name: 'formList',
        direction: 'horizontal',
      },
    },
    // 组件样式
    style: {},
  },
  // 组件事件
  events: [],
};
