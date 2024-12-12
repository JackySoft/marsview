/**
 * 组件配置和属性值
 */
import { FormInstance } from 'antd';
import RulesSetting from '../../components/RulesSetting';
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
      key: 'title2',
    },
    {
      type: 'Switch',
      label: '支持清除',
      name: ['formWrap', 'allowClear'],
    },
    {
      type: 'Switch',
      label: '可检索',
      name: ['formWrap', 'showSearch'],
    },
    {
      type: 'Select',
      label: '选项模式',
      name: ['formWrap', 'mode'],
      props: {
        options: [
          { value: '', label: '单选模式' },
          { value: 'multiple', label: '多选模式' },
          { value: 'tags', label: '标签模式' },
        ],
      },
    },
    {
      type: 'InputNumber',
      label: '最大Tag数量',
      name: ['formWrap', 'maxTagCount'],
    },
    {
      type: 'Input',
      label: '默认提示',
      name: ['formWrap', 'placeholder'],
    },
    {
      type: 'Switch',
      label: '禁用',
      name: ['formWrap', 'disabled'],
    },
    {
      type: 'Switch',
      label: '包含Label',
      name: ['formWrap', 'labelInValue'],
      tooltip: '提交时，会把label包装到value中',
    },
    {
      type: 'Select',
      label: '边框样式',
      name: ['formWrap', 'variant'],
      props: {
        options: [
          { value: '', label: '无' },
          { value: 'outlined', label: '外边框' },
          { value: 'borderless', label: '无边框' },
          { value: 'filled', label: '填充' },
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
        label: '下拉框',
        name: 'select',
      },
      // 组件默认属性值
      formWrap: {
        placeholder: '请选择数据',
        allowClear: true,
        mode: '',
      },
      field: {
        label: 'label',
        value: 'value',
      },
    },
    // 组件样式
    style: {
      minWidth: 120,
    },
    // 接口配置
    api: {
      sourceType: 'json',
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
