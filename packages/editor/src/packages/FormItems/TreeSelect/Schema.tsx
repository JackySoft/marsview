/**
 * 组件配置和属性值
 */
import { FormInstance, TreeSelect } from 'antd';
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
      label: '支持清除',
      name: ['formWrap', 'allowClear'],
    },
    {
      type: 'Switch',
      label: '禁用',
      name: ['formWrap', 'disabled'],
    },
    {
      type: 'Switch',
      label: 'labelInValue',
      name: ['formWrap', 'labelInValue'],
    },
    {
      type: 'InputNumber',
      label: '最大Tag数量',
      name: ['formWrap', 'maxTagCount'],
    },
    {
      type: 'Switch',
      label: '支持多选',
      name: ['formWrap', 'multiple'],
    },
    {
      type: 'Input',
      label: '默认提示',
      name: ['formWrap', 'placeholder'],
    },
    {
      type: 'Select',
      label: '弹出位置',
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
      type: 'Select',
      label: '节点回填',
      name: ['formWrap', 'showCheckedStrategy'],
      tooltip: '节点为复选框时生效。',
      props: {
        options: [
          { value: TreeSelect.SHOW_ALL, label: '显示所有' },
          { value: TreeSelect.SHOW_PARENT, label: '显示父节点' },
          { value: TreeSelect.SHOW_CHILD, label: '显示子节点' },
        ],
      },
    },
    {
      type: 'Switch',
      label: '支持搜索',
      name: ['formWrap', 'showSearch'],
    },
    {
      type: 'Switch',
      label: '显示复选框',
      name: ['formWrap', 'treeCheckable'],
    },
    {
      type: 'Switch',
      label: '父子联动',
      name: ['formWrap', 'treeCheckStrictly'],
    },
    {
      type: 'Switch',
      label: '简单格式',
      name: ['formWrap', 'treeDataSimpleMode'],
      tooltip: '简单格式的 treeData，[{id:1, pId:0, value:1,title:"test"]',
    },
    {
      type: 'Switch',
      label: '展开所有',
      name: ['formWrap', 'treeDefaultExpandAll'],
    },
    {
      type: 'Switch',
      label: '展示线条',
      name: ['formWrap', 'treeLine'],
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
        label: '树选择',
        name: 'treeSelect',
      },
      // 组件默认属性值
      formWrap: {
        allowClear: true,
        fieldNames: {
          label: 'title',
          value: 'value',
          children: 'children',
        },
        labelInValue: false,
        placement: 'bottomLeft',
      },
    },
    // 组件样式
    style: {
      minWidth: 180,
    },
    // 接口配置
    api: {
      sourceType: 'json',
      source: [
        {
          value: '1001',
          title: '湖北省',
          children: [
            {
              value: '100101',
              title: '武汉市',
              children: [
                {
                  value: '1001011',
                  title: '江夏区',
                },
                {
                  value: '1001012',
                  title: '汉阳区',
                },
              ],
            },
            {
              value: '100102',
              title: '襄阳市',
              children: [
                {
                  value: '1001021',
                  title: '襄城区',
                },
                {
                  value: '1001022',
                  title: '樊城区',
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
