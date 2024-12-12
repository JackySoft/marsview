/**
 * 组件配置和属性值
 */
import { FormInstance } from 'antd';
import TableSetting from './TableSetting.tsx';
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
      label: '表格配置',
    },
    {
      type: 'Switch',
      label: '显示边框',
      name: ['formWrap', 'bordered'],
    },
    {
      type: 'Select',
      label: '表格尺寸',
      name: ['formWrap', 'size'],
      props: {
        options: [
          { label: '默认', value: 'large' },
          { label: '中等', value: 'middle' },
          { label: '紧凑', value: 'small' },
        ],
      },
    },
    {
      type: 'InputNumber',
      label: '滚动轴(x)',
      name: ['formWrap', 'scroll', 'x'],
      tooltip: '如果需要横向滚动，请设置x值，尽量比表格实际宽度大',
      props: {
        placeholder: 'eg: 1000',
      },
    },
    {
      type: 'InputNumber',
      label: '滚动轴(y)',
      name: ['formWrap', 'scroll', 'y'],
      tooltip: '如果需要纵向滚动，请设置y值来固定高度',
      props: {
        placeholder: 'eg: 600',
      },
    },
    {
      type: 'Title',
      label: '列配置',
      key: 'columnConfig',
    },
    {
      type: 'function',
      key: 'TableSetting',
      render(form: FormInstance) {
        return <TableSetting key="TableSetting" form={form} />;
      },
    },
  ],
  config: {
    props: {
      formItem: {
        label: '编辑用户',
        name: 'userData',
      },
      formWrap: {
        field: 'data',
        size: 'large',
        bordered: true,
        // 组件默认属性值
        columns: [
          {
            title: '姓名',
            dataIndex: 'name',
            key: 'name',
            align: 'center',
            type: 'text',
            defaultValue: '',
            placeholder: '请输入姓名',
          },
          {
            title: '年级',
            dataIndex: 'grade',
            key: 'grade',
            align: 'center',
            type: 'select',
            options: [
              { label: '一年级', value: 1 },
              { label: '二年级', value: 2 },
              { label: '三年级', value: 3 },
            ],
            dataSource: 'static',
            defaultValue: 3,
            placeholder: '请选择年级',
          },
          {
            title: '分数',
            dataIndex: 'score',
            key: 'score',
            align: 'center',
            type: 'number',
            defaultValue: '',
            placeholder: '请输入分数',
          },
          {
            title: '出生日期',
            dataIndex: 'birthday',
            key: 'birthday',
            type: 'date',
            align: 'center',
            format: 'YYYY-MM-DD',
            defaultValue: '2020-08-08',
            placeholder: '请选择日期',
          },
          {
            title: '共青团员',
            dataIndex: 'isMember',
            key: 'isMember',
            align: 'center',
            type: 'switch',
            defaultValue: true,
          },
        ],
      },
    },
    // 组件样式
    style: {},
    events: [],
    api: {
      sourceType: 'json',
      sourceField: 'data.list',
      // 数据源
      source: [],
    },
  },
  // 组件事件,动态事件需要以Dynamic开头
  events: [],
  methods: [],
};
