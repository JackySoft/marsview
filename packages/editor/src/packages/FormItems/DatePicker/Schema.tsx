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
      type: 'Select',
      label: '默认值',
      name: ['defaultValue'],
      props: {
        allowClear: true,
        options: [
          { value: 'today', label: '今天' },
          { value: 'yesterday', label: '昨天' },
          { value: 'last7', label: '一周前' },
          { value: 'last30', label: '一个月前' },
          { value: 'last90', label: '三个月前' },
        ],
      },
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
      type: 'Select',
      label: '日期类型',
      name: ['formWrap', 'picker'],
      props: {
        options: [
          { value: 'date', label: '日期' },
          { value: 'year', label: '年份' },
          { value: 'quarter', label: '季度' },
          { value: 'month', label: '月份' },
          { value: 'week', label: '周' },
          { value: 'time', label: '时间' },
        ],
      },
    },
    {
      type: 'Select',
      label: '日期格式',
      name: ['formWrap', 'format'],
      props: {
        options: [
          { value: 'YYYY-MM-DD', label: '年-月-日' },
          { value: 'YYYY-MM-DD HH:mm:ss', label: '年-月-日 时:分:秒' },
          { value: 'YYYY', label: '年' },
          { value: 'YYYY-MM', label: '年-月' },
          { value: 'YYYY-qQ', label: '季度' },
          { value: 'YYYY-wo', label: '周' },
          { value: 'HH:mm:ss', label: '24时制 时:分:秒' },
          { value: 'hh:mm:ss', label: '12时制 时:分:秒' },
          { value: 'h:mm A', label: '时:分 上/下午' },
        ],
      },
    },
    {
      type: 'Switch',
      label: '快捷日期',
      name: ['formWrap', 'showNow'],
    },
    {
      type: 'Switch',
      label: '显示时间',
      name: ['formWrap', 'showTime'],
    },
    {
      type: 'Switch',
      label: '是否禁用',
      name: ['formWrap', 'disabled'],
    },
    {
      type: 'Switch',
      label: '显示清除',
      name: ['formWrap', 'allowClear'],
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
        label: '日期',
        name: 'datepicker',
      },
      // 组件默认属性值
      formWrap: {
        placeholder: '请选择',
        allowClear: true,
        showNow: true,
        picker: 'date',
        format: 'YYYY-MM-DD',
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
  methods: [
    {
      name: 'update',
      title: '更新数据',
    },
  ],
};
