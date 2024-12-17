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
    {
      type: 'Title',
      label: '表单配置',
    },
    {
      type: 'Select',
      label: '主题',
      name: ['formWrap', 'theme'],
      props: {
        options: [
          { value: 'apathy', label: 'apathy' },
          { value: 'apathy:inverted', label: 'apathy:inverted' },
          { value: 'ashes', label: 'ashes' },
          { value: 'bespin', label: 'bespin' },
          { value: 'brewer', label: 'brewer' },
          { value: 'bright:inverted', label: 'bright:inverted' },
          { value: 'bright', label: 'bright' },
          { value: 'chalk', label: 'chalk' },
          { value: 'codeschool', label: 'codeschool' },
          { value: 'colors', label: 'colors' },
          { value: 'eighties', label: 'eighties' },
          { value: 'embers', label: 'embers' },
          { value: 'flat', label: 'flat' },
          { value: 'google', label: 'google' },
          { value: 'grayscale', label: 'grayscale' },
          { value: 'grayscale:inverted', label: 'grayscale:inverted' },
          { value: 'greenscreen', label: 'greenscreen' },
          { value: 'harmonic', label: 'harmonic' },
          { value: 'hopscotch', label: 'hopscotch' },
          { value: 'isotope', label: 'isotope' },
          { value: 'marrakesh', label: 'marrakesh' },
          { value: 'mocha', label: 'mocha' },
          { value: 'monokai', label: 'monokai' },
          { value: 'ocean', label: 'ocean' },
          { value: 'paraiso', label: 'paraiso' },
          { value: 'pop', label: 'pop' },
          { value: 'railscasts', label: 'railscasts' },
          { value: 'rjv-default', label: 'rjv-default' },
          { value: 'shapeshifter', label: 'shapeshifter' },
          { value: 'shapeshifter:inverted', label: 'shapeshifter:inverted' },
          { value: 'solarized', label: 'solarized' },
          { value: 'summerfruit', label: 'summerfruit' },
          { value: 'summerfruit:inverted', label: 'summerfruit:inverted' },
          { value: 'threezerotwofour', label: 'threezerotwofour' },
          { value: 'tomorrow', label: 'tomorrow' },
          { value: 'tube', label: 'tube' },
          { value: 'twilight', label: 'twilight' },
        ],
      },
    },
    {
      type: 'Switch',
      label: '是否禁用',
      name: ['formWrap', 'disabled'],
    },
    {
      type: 'Input',
      label: '占位提示',
      name: ['formWrap', 'placeholder'],
    },
    {
      type: 'Select',
      label: '折叠图标',
      name: ['formWrap', 'iconStyle'],
      props: {
        options: [
          { value: 'circle', label: 'circle' },
          { value: 'triangle', label: 'triangle' },
          { value: 'square', label: 'square' },
        ],
      },
    },
    {
      type: 'InputNumber',
      label: '缩进',
      name: ['formWrap', 'indentWidth'],
    },
    {
      type: 'InputNumber',
      label: '长度限制',
      name: ['formWrap', 'collapseStringsAfterLength'],
    },
    {
      type: 'InputNumber',
      label: '展开层级',
      name: ['formWrap', 'collapsed'],
    },
    {
      type: 'Switch',
      label: '是否可复制',
      name: ['formWrap', 'enableClipboard'],
    },
    {
      type: 'Switch',
      label: '是否展示对象大小',
      name: ['formWrap', 'displayObjectSize'],
    },
    {
      type: 'Switch',
      label: '是否展示数据类型',
      name: ['formWrap', 'displayDataTypes'],
    },
    {
      type: 'Switch',
      label: '是否排序键值顺序',
      name: ['formWrap', 'sortKeys'],
    },
    {
      type: 'Switch',
      label: '是否展示键值引号',
      name: ['formWrap', 'quotesOnKeys'],
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
        label: 'Json',
        name: 'json',
      },
      formWrap: {
        placeholder: '暂无数据',
        collapsed: 1,
        enableClipboard: true,
        displayObjectSize: true,
        displayDataTypes: true,
        sortKeys: true,
        quotesOnKeys: true,
      },
    },
    // 组件样式
    style: {},
    // 接口配置
    api: {},
  },
  // 组件事件
  events: [
    {
      value: 'onAdd',
      name: 'onAdd事件',
    },
    {
      value: 'onEdit',
      name: 'onEdit事件',
    },
    {
      value: 'onDelete',
      name: 'onDelete事件',
    },
  ],
  methods: [
    {
      name: 'update',
      title: '更新数据',
    },
  ],
};
