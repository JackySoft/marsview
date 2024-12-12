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
      type: 'InputNumber',
      label: '最小值',
      name: ['formWrap', 'min'],
    },
    {
      type: 'InputNumber',
      label: '最大值',
      name: ['formWrap', 'max'],
    },
    {
      type: 'InputNumber',
      label: '步长',
      name: ['formWrap', 'step'],
    },
    {
      type: 'Switch',
      label: '双滑块',
      name: ['formWrap', 'range'],
    },
    {
      type: 'Switch',
      label: '反向坐标',
      name: ['formWrap', 'reverse'],
    },
    {
      type: 'Switch',
      label: '是否禁用',
      name: ['formWrap', 'disabled'],
    },
    {
      type: 'Switch',
      label: '方向',
      name: ['formWrap', 'vertical'],
      tooltip: '默认水平方向',
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
      defaultValue: 5,
      formItem: {
        label: '滑动条',
        name: 'slider',
      },
      // 组件默认属性值
      formWrap: {
        min: 0,
        max: 10,
        step: 1,
        range: false,
        reverse: false,
        vertical: false,
      },
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
