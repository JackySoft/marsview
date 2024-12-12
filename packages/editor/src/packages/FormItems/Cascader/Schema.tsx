/**
 * 组件配置和属性值
 */
import { Cascader, FormInstance } from 'antd';
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
      type: 'Switch',
      label: '支持多选',
      name: ['formWrap', 'multiple'],
    },
    {
      type: 'Switch',
      label: '支持清除',
      name: ['formWrap', 'allowClear'],
    },
    {
      type: 'Switch',
      label: '禁用',
      name: ['formWrap', 'disabled'],
    },
    {
      type: 'Input',
      label: '默认提示',
      name: ['formWrap', 'placeholder'],
    },
    {
      type: 'Select',
      label: '回填方式',
      name: ['formWrap', 'showCheckedStrategy'],
      tooltip: '只有多选模式下生效',
      props: {
        options: [
          { value: Cascader.SHOW_CHILD, label: '只显示子节点' },
          { value: Cascader.SHOW_PARENT, label: '只显示父节点' },
        ],
      },
    },
    {
      type: 'Select',
      label: '预设位置',
      name: ['formWrap', 'placement'],
      props: {
        options: [
          { value: 'bottomLeft', label: 'bottomLeft' },
          { value: 'bottomRight', label: 'bottomRight' },
          { value: 'topLeft', label: 'topLeft' },
          { value: 'topRight', label: 'topRight' },
        ],
      },
    },
    {
      type: 'Switch',
      label: '显示搜索',
      name: ['formWrap', 'showSearch'],
    },
    {
      type: 'Select',
      label: '展开方式',
      name: ['formWrap', 'expandTrigger'],
      tooltip: '子菜单的展开方式',
      props: {
        options: [
          { value: 'click', label: '点击展开' },
          { value: 'hover', label: '悬浮展开' },
        ],
      },
    },
    {
      type: 'InputNumber',
      label: '最大Tag数量',
      name: ['formWrap', 'maxTagCount'],
      tooltip: '最多显示几个Tag，超出会折叠',
      props: {
        placeholder: '输入数字',
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
      label: '字段映射',
      key: 'fieldMap',
    },
    {
      type: 'Input',
      label: 'label',
      name: ['formWrap', 'fieldNames', 'label'],
    },
    {
      type: 'Input',
      label: 'value',
      name: ['formWrap', 'fieldNames', 'value'],
    },
    {
      type: 'Input',
      label: 'children',
      name: ['formWrap', 'fieldNames', 'children'],
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
        label: '级联选择',
        name: 'cascader',
      },
      // 组件默认属性值
      formWrap: {
        placeholder: '请选择',
        allowClear: true,
        showCheckedStrategy: Cascader.SHOW_PARENT,
        showSearch: false,
        placement: 'bottomLeft',
        fieldNames: {
          label: 'label',
          value: 'value',
          children: 'children',
        },
      },
    },
    // 组件样式
    style: {},
    // 接口配置
    api: {
      sourceType: 'json',
      source: [
        {
          value: 'zhejiang',
          label: 'Zhejiang',
          children: [
            {
              value: 'hangzhou',
              label: 'Hangzhou',
              children: [
                {
                  value: 'xihu',
                  label: 'West Lake',
                },
              ],
            },
          ],
        },
        {
          value: 'jiangsu',
          label: 'Jiangsu',
          children: [
            {
              value: 'nanjing',
              label: 'Nanjing',
              children: [
                {
                  value: 'zhonghuamen',
                  label: 'Zhong Hua Men',
                },
              ],
            },
          ],
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
