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
      props: {
        placeholder: '请输入默认值',
      },
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
        placeholder: '默认提示文案',
      },
    },
    {
      type: 'Input',
      label: 'Tooltip',
      name: ['formItem', 'tooltip'],
      tooltip: '表单项后面显示的提示信息',
      props: {
        placeholder: '提示信息',
      },
    },
    {
      type: 'Title',
      label: '表单配置',
      key: 'formWrap',
    },
    {
      type: 'Input',
      label: '占位提示',
      name: ['formWrap', 'placeholder'],
      props: {
        placeholder: '默认提示',
      },
    },
    {
      type: 'Switch',
      label: '允许清除',
      name: ['formWrap', 'allowClear'],
    },
    {
      type: 'Switch',
      label: '显示字数',
      name: ['formWrap', 'showCount'],
    },
    {
      type: 'InputNumber',
      label: '最大长度',
      name: ['formWrap', 'maxLength'],
      props: {
        placeholder: '长度限制',
      },
    },
    {
      type: 'Switch',
      label: '是否禁用',
      name: ['formWrap', 'disabled'],
    },
    {
      type: 'Input',
      label: '前置标签',
      name: ['formWrap', 'addonBefore'],
      props: {
        placeholder: 'eg: http://',
      },
    },
    {
      type: 'Input',
      label: '后置标签',
      name: ['formWrap', 'addonAfter'],
      props: {
        placeholder: 'eg: .com',
      },
    },
    {
      type: 'Icons',
      label: '前缀',
      name: ['formWrap', 'prefixIcons'],
      props: {
        placeholder: '请选择图标',
      },
    },
    {
      type: 'Icons',
      label: '后缀',
      name: ['formWrap', 'suffixIcons'],
      props: {
        placeholder: '请选择图标',
      },
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
        label: '输入框',
        name: 'input',
      },
      // 组件默认属性值
      formWrap: {
        placeholder: '请输入文本',
        allowClear: true,
      },
      defaultValue: '',
    },
    // 组件样式
    style: {},
  },
  // 组件事件
  events: [
    {
      value: 'onChange',
      name: '输入事件',
    },
    {
      value: 'onBlur',
      name: '失焦事件',
    },
    {
      value: 'onPressEnter',
      name: '回车事件',
    },
  ],
};
