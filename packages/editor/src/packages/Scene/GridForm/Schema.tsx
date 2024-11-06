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
      label: '字段',
      name: 'name',
      props: {
        placeholder: '表单字段（默认可空）',
      },
    },
    {
      type: 'Switch',
      label: '显示冒号',
      name: 'colon',
    },
    {
      type: 'Select',
      label: '标签对齐',
      name: 'labelAlign',
      props: {
        options: [
          { label: '左对齐', value: 'left' },
          { label: '右对齐', value: 'right' },
        ],
      },
    },
    {
      type: 'Switch',
      label: '禁用',
      name: ['disabled'],
    },
    {
      type: 'Select',
      label: '表单尺寸',
      name: 'size',
      props: {
        options: [
          { label: '小号', value: 'small' },
          { label: '中号', value: 'middle' },
          { label: '大号', value: 'large' },
        ],
      },
    },
    {
      type: 'InputNumber',
      label: '每行几列',
      name: ['cols'],
    },
    {
      type: 'Title',
      label: '布局',
      key: 'FormLayout',
    },
    {
      type: 'Select',
      label: '表单布局',
      name: 'layout',
      props: {
        options: [
          { label: '水平布局', value: 'horizontal' },
          { label: '垂直布局', value: 'vertical' },
          { label: '行内布局', value: 'inline' },
        ],
      },
    },
    {
      type: 'InputNumber',
      label: '标签布局',
      name: ['labelCol', 'span'],
      props: {
        placeholder: '栅栏数',
      },
    },
    {
      type: 'InputNumber',
      label: '标签偏移',
      name: ['labelCol', 'offset'],
      props: {
        placeholder: '偏移数',
      },
    },
    {
      type: 'InputNumber',
      label: '控件占列',
      name: ['wrapperCol', 'span'],
      props: {
        placeholder: '栅栏数',
      },
    },
    {
      type: 'InputNumber',
      label: '控件偏移',
      name: ['wrapperCol', 'offset'],
      props: {
        placeholder: '偏移数',
      },
    },
    {
      type: 'Title',
      label: '其他配置',
      key: 'OtherConfig',
    },

    {
      type: 'Select',
      label: '表单形态',
      name: 'variant',
      props: {
        options: [
          { value: 'outlined', label: '外边框' },
          { value: 'borderless', label: '无边框' },
          { value: 'filled', label: '填充' },
        ],
      },
    },
  ],
  config: {
    props: {
      colon: true,
      labelAlign: 'right',
      layout: 'horizontal',
      cols: 4,
      labelCol: {
        span: 8,
      },
      wrapperCol: {
        span: 16,
      },
    },
    // 组件样式
    style: {
      backgroundColor: '#fff',
    },
    events: [],
    api: {},
  },
  // 组件事件
  events: [
    {
      value: 'onSearch',
      name: '查询事件',
    },
    {
      value: 'onReset',
      name: '重置事件',
    },
    {
      value: 'onChange',
      name: '值变化事件',
    },
  ],
  methods: [
    {
      name: 'reset',
      title: '表单重置',
    },
    {
      name: 'submit',
      title: '表单提交',
    },
    {
      name: 'init',
      title: '表单赋值',
    },
    {
      name: 'getFormData',
      title: '获取表单数据',
    },
  ],
};
