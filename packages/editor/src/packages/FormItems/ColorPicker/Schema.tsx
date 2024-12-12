/**
 * 组件配置和属性值
 */
export default {
  // 组件属性配置JSON
  attrs: [
    {
      type: 'Title',
      label: '标签配置',
      key: 'formItem',
    },
    {
      type: 'Input',
      label: '标题',
      name: ['formItem', 'label'],
      props: {
        placeholder: '请输入文本标题',
      },
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
      type: 'Variable',
      label: '默认值',
      name: ['defaultValue'],
    },
    {
      type: 'Switch',
      label: '无样式',
      name: ['formItem', 'noStyle'],
    },
    {
      type: 'Switch',
      label: '隐藏域',
      name: ['formItem', 'hidden'],
    },
    {
      type: 'Input',
      label: 'Extra',
      name: ['formItem', 'extra'],
      tooltip: '表单控件下方显示的提示信息',
      props: {
        placeholder: '请输入',
      },
    },
    {
      type: 'Input',
      label: 'Tooltip',
      name: ['formItem', 'tooltip'],
      tooltip: '表单项后面显示的提示信息',
      props: {
        placeholder: '请输入',
      },
    },

    {
      type: 'Title',
      label: '表单配置',
      key: 'formWrap',
    },
    {
      type: 'Switch',
      label: '允许清除',
      name: ['formWrap', 'allowClear'],
    },
    {
      type: 'Switch',
      label: '是否禁用',
      name: ['formWrap', 'disabled'],
    },
    {
      type: 'Switch',
      label: '禁用透明度',
      name: ['formWrap', 'disabledAlpha'],
    },
    {
      type: 'Select',
      label: '颜色格式',
      name: ['formWrap', 'format'],
      props: {
        placeholder: '请选择',
        options: [
          { value: 'rgb', label: 'rgb' },
          { value: 'hex', label: 'hex' },
          { value: 'hsb', label: 'hsb' },
        ],
      },
    },
    {
      type: 'Select',
      label: '单色与渐变',
      name: ['formWrap', 'mode'],
      props: {
        mode: 'multiple',
        placeholder: '请选择',
        options: [
          { value: 'single', label: 'single' },
          { value: 'gradient', label: 'gradient' },
        ],
      },
    },
    {
      type: 'Select',
      label: '窗口位置',
      name: ['formWrap', 'placement'],
      props: {
        options: [
          { value: 'top', label: 'top' },
          { value: 'left', label: 'left' },
          { value: 'right', label: 'right' },
          { value: 'bottom', label: 'bottom' },
          { value: 'topLeft', label: 'topLeft' },
          { value: 'topRight', label: 'topRight' },
          { value: 'bottomLeft', label: 'bottomLeft' },
          { value: 'bottomRight', label: 'bottomRight' },
          { value: 'leftTop', label: 'leftTop' },
          { value: 'leftBottom', label: 'leftBottom' },
          { value: 'rightTop', label: 'rightTop' },
          { value: 'rightBottom', label: 'rightBottom' },
        ],
      },
    },
    {
      type: 'Switch',
      label: '显示颜色文本',
      name: ['formWrap', 'showText'],
    },
    {
      type: 'Select',
      label: '触发器大小',
      name: ['formWrap', 'size'],
      props: {
        options: [
          { value: 'large', label: 'large' },
          { value: 'middle', label: 'middle' },
          { value: 'small', label: 'small' },
        ],
      },
    },
    {
      type: 'Select',
      label: '触发方式',
      name: ['formWrap', 'trigger'],
      props: {
        options: [
          { value: 'hover', label: 'hover' },
          { value: 'click', label: 'click' },
        ],
      },
    },

    {
      type: 'Title',
      label: '布局',
      key: 'FormLayout',
    },
    {
      type: 'InputNumber',
      label: '标签占位',
      name: ['formItem', 'labelCol', 'span'],
      props: {
        placeholder: '占位格数',
      },
    },
    {
      type: 'InputNumber',
      label: '标签偏移',
      name: ['formItem', 'labelCol', 'offset'],
      props: {
        placeholder: '偏移数',
      },
    },
    {
      type: 'InputNumber',
      label: '控件占列',
      name: ['formItem', 'wrapperCol', 'span'],
      props: {
        placeholder: '占位格数',
      },
    },
    {
      type: 'InputNumber',
      label: '控件偏移',
      name: ['formItem', 'wrapperCol', 'offset'],
      props: {
        placeholder: '偏移数',
      },
    },
  ],
  config: {
    // 组件默认属性值
    props: {
      formItem: {
        label: '颜色选择器',
        name: 'value',
      },
      // 组件默认属性值
      formWrap: {
        allowClear: false,
        format: 'hex',
        mode: ['single'],
        placement: 'bottomLeft',
        size: 'middle',
        trigger: 'click',
      },
      defaultValue: '',
    },
    // 组件样式
    style: {},
    // 事件
    events: [],
  },
  // 组件事件
  events: [
    {
      value: 'onChange',
      name: '颜色变化的回调',
    },
    {
      value: 'onChangeComplete',
      name: '颜色选择完成的回调',
    },
  ],
  methods: [],
};
