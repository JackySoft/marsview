/**
 * 组件配置和属性值
 */
export default {
  // 组件属性配置JSON
  attrs: [
    {
      type: 'Title',
      label: '标签配置',
      key: 'title1',
    },
    {
      type: 'Input',
      label: '标题',
      name: ['formItem', 'label'],
    },
    {
      type: 'Input',
      label: '字段',
      name: ['formItem', 'name'],
    },
    {
      type: 'Switch',
      label: '默认值',
      name: ['defaultValue'],
    },
    {
      type: 'Switch',
      label: '无样式',
      name: ['formItem', 'noStyle'],
    },
    {
      type: 'Input',
      label: 'Extra',
      name: ['formItem', 'extra'],
      tooltip: '表单控件下方显示的提示信息',
    },
    {
      type: 'Input',
      label: 'Tooltip',
      name: ['formItem', 'tooltip'],
      tooltip: '表单项后面显示的提示信息',
    },
    {
      type: 'Title',
      label: '表单配置',
      key: 'title2',
    },
    {
      type: 'Switch',
      label: '禁用',
      name: ['formWrap', 'disabled'],
    },
    {
      type: 'Input',
      label: '开启文案',
      name: ['formWrap', 'checkedChildren'],
    },
    {
      type: 'Input',
      label: '关闭文案',
      name: ['formWrap', 'unCheckedChildren'],
    },
    {
      type: 'Switch',
      label: '加载中',
      name: ['formWrap', 'loading'],
    },
  ],
  config: {
    props: {
      formItem: {
        label: '开关',
        name: 'switch',
      },
      // 组件默认属性值
      formWrap: {},
    },
    // 组件样式
    style: {},
  },
  // 组件事件
  events: [
    {
      value: 'onChange',
      name: 'onChange事件',
    },
  ],
};
