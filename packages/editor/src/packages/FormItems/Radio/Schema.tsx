/**
 * 组件配置和属性值
 */
import { FormInstance } from 'antd';
import RulesSetting from '../../components/RulesSetting';
export default {
  attrs: [
    {
      type: 'Title',
      label: '标签配置',
      key: 'title',
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
      type: 'Select',
      label: '按钮类型',
      name: ['formWrap', 'optionType'],
      props: {
        options: [
          { value: 'default', label: '默认' },
          { value: 'button', label: '按钮' },
        ],
      },
    },
    {
      type: 'Select',
      label: '按钮样式',
      name: ['formWrap', 'buttonStyle'],
      tooltip: '指定按钮类型为按钮后，才会生效',
      props: {
        options: [
          { value: 'outline', label: '虚线' },
          { value: 'solid', label: '实线' },
        ],
      },
    },
    {
      type: 'Switch',
      label: '禁用',
      name: ['formWrap', 'disabled'],
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
    {
      type: 'Title',
      label: '字段映射',
      key: 'fieldMap',
    },
    {
      type: 'Input',
      label: 'label',
      name: ['field', 'label'],
    },
    {
      type: 'Input',
      label: 'value',
      name: ['field', 'value'],
    },
    {
      type: 'Title',
      label: '校验规则',
      key: 'rules',
    },
    {
      type: 'function',
      render: (form: FormInstance) => {
        return <RulesSetting key="rule-list" form={form} />;
      },
    },
  ],
  config: {
    props: {
      formItem: {
        label: '单选',
        name: 'radio',
      },
      formWrap: {
        optionType: 'default',
        buttonStyle: 'solid',
      },
      field: {
        label: 'label',
        value: 'value',
      },
    },
    // 组件样式
    style: {},
    // 接口配置
    api: {
      sourceType: 'json',
      // 数据源
      source: [
        {
          label: '选项1',
          value: 1,
        },
        {
          label: '选项2',
          value: 2,
        },
      ],
    },
  },
  // 组件事件
  events: [
    {
      value: 'onChange',
      name: 'onChange事件',
    },
  ],
  methods: [
    {
      name: 'update',
      title: '更新数据',
    },
  ],
};
