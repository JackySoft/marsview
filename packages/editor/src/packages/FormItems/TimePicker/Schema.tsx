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
      props: {
        placeholder: 'eg: 15:36:00',
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
      label: '展示格式',
      name: ['formWrap', 'format'],
      props: {
        options: [
          { value: 'HH:mm:ss', label: '时:分:秒' },
          { value: 'HH:mm', label: '时:分' },
          { value: 'HHmmss', label: '时分秒' },
          { value: 'HHmm', label: '时分' },
          { value: 'HH', label: '时' },
          { value: 'mm', label: '分' },
          { value: 'ss', label: '秒' },
        ],
      },
    },
    {
      type: 'Input',
      label: '占位提示',
      name: ['formWrap', 'placeholder'],
      props: {
        placeholder: '输入默认提示',
      },
    },
    {
      type: 'Switch',
      label: '显示删除',
      name: ['formWrap', 'allowClear'],
    },
    {
      type: 'Switch',
      label: '滚动值',
      tooltip: '在滚动时改变选择值',
      name: ['formWrap', 'changeOnScroll'],
    },
    {
      type: 'Switch',
      label: '是否禁用',
      name: ['formWrap', 'disabled'],
    },
    {
      type: 'Switch',
      label: '只读模式',
      name: ['formWrap', 'inputReadOnly'],
    },
    {
      type: 'InputNumber',
      label: '小时步长',
      name: ['formWrap', 'hourStep'],
      tooltip: '小时选项间隔',
    },
    {
      type: 'InputNumber',
      label: '分钟步长',
      name: ['formWrap', 'minuteStep'],
      tooltip: '分钟选项间隔',
    },
    {
      type: 'InputNumber',
      label: '秒步长',
      name: ['formWrap', 'secondStep'],
      tooltip: '秒选项间隔',
    },
    {
      type: 'Switch',
      label: '显示确认',
      name: ['formWrap', 'needConfirm'],
      tooltip: '是否需要确认按钮，为 false 时失去焦点即代表选择',
    },
    {
      type: 'Switch',
      label: '显示此刻',
      name: ['formWrap', 'showNow'],
      tooltip: '面板是否显示“此刻”按钮',
    },
    {
      type: 'Switch',
      label: '12时制',
      name: ['formWrap', 'use12Hours'],
      tooltip: '使用 12 小时制，为 true 时 format 默认为 h:mm:ss a',
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
        label: '时间',
        name: 'timepicker',
      },
      // 组件默认属性值
      formWrap: {
        placeholder: '请选择',
        allowClear: true,
        format: 'HH:mm:ss',
        changeOnScroll: false,
        hourStep: 1,
        minuteStep: 1,
        secondStep: 1,
        showNow: true,
        use12Hours: false,
        needConfirm: true,
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
