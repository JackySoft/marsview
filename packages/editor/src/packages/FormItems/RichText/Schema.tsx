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
      type: 'Switch',
      label: '只读',
      name: ['formWrap', 'readOnly'],
    },
    {
      type: 'Input',
      label: '占位符',
      name: ['formWrap', 'placeholder'],
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
        label: '富文本',
        name: 'richText',
      },
      // 组件默认属性值
      formWrap: {
        placeholder: '我是一款低代码平台',
        readOnly: false,
      },
      defaultValue: '',
    },
    // 组件样式
    style: {
      height: '200px',
    },
  },
  // 组件事件
  events: [
    {
      value: 'onChange',
      name: 'onChange事件',
    },
    {
      value: 'onBlur',
      name: 'onBlur事件',
    },
  ],
};
