import IConSetting from '@/packages/components/IConSetting';
import RulesSetting from '@/packages/components/RulesSetting';
import { FormInstance } from 'antd';

const RateSetting = [
  {
    type: 'Title',
    label: '标签配置',
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
  },
  {
    type: 'Input',
    label: 'Tooltip',
    name: ['formItem', 'tooltip'],
    tooltip: '表单项后面显示的提示信息',
  },
];

const FormSetting = [
  {
    type: 'Title',
    label: '表单配置',
  },
  {
    type: 'Switch',
    label: '是否半选',
    name: ['formWrap', 'allowHalf'],
  },
  {
    type: 'Switch',
    label: '点击清除',
    name: ['formWrap', 'allowClear'],
  },
  {
    type: 'InputNumber',
    label: '总数',
    name: ['formWrap', 'count'],
  },
  {
    type: 'Switch',
    label: '是否禁用',
    name: ['formWrap', 'disabled'],
  },
  {
    type: 'function',
    label: '自定义字符',
    name: ['formWrap', 'character'],
    render: (form: FormInstance) => {
      form.setFieldValue(['formWrap', 'character'], 'StarFilled');
      return <IConSetting name={['formWrap', 'character']} />;
    },
  },
];

const CommonSetting = [
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
];

export default {
  attrs: [...RateSetting, ...FormSetting, ...CommonSetting],
  config: {
    props: {
      formItem: {
        label: '评分项',
        name: 'rate',
      },
      // 组件默认属性值
      formWrap: {
        count: 5, // star 总数
        allowHalf: false, // 是否允许半选
        allowClear: true, // 是否允许再次点击后清除
      },
    },
    // 组件样式
    style: {},
  },
  events: [
    {
      value: 'onChange',
      name: 'onChange事件',
    },
    {
      value: 'onHoverChange',
      name: 'onHoverChange事件',
    },
  ],
};
