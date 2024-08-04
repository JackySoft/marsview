/**
 * 组件配置和属性值
 */
import TableSetting from './TableSetting';
import ActionSetting from '@/components/BulkAction/ActionSetting';
import { FormInstance } from 'antd';
export default {
  // 组件属性配置JSON
  attrs: [
    {
      type: 'Title',
      label: '操作栏',
    },
    {
      type: 'function',
      render(form: FormInstance) {
        return <ActionSetting key="ActionSetting" form={form} />;
      },
    },
    {
      type: 'Title',
      label: '表格配置',
    },
    {
      type: 'Input',
      label: '标题',
      name: ['leftTitle'],
    },
    {
      type: 'Switch',
      label: '显示边框',
      name: ['bordered'],
    },
    {
      type: 'Select',
      label: '表格尺寸',
      name: ['size'],
      props: {
        options: [
          { label: '默认', value: 'large' },
          { label: '中等', value: 'middle' },
          { label: '紧凑', value: 'small' },
        ],
      },
    },
    {
      type: 'Select',
      label: '单选/多选',
      name: ['selectionType'],
      props: {
        options: [
          { label: '无', value: '' },
          { label: '单选', value: 'radio' },
          { label: '多选', value: 'checkbox' },
        ],
      },
    },
    {
      type: 'InputNumber',
      label: '滚动轴(x)',
      name: ['scroll', 'x'],
      tooltip: '如果需要横向滚动，请设置x值，尽量比表格实际宽度大',
      props: {
        placeholder: 'eg: 1000',
      },
    },
    {
      type: 'InputNumber',
      label: '滚动轴(y)',
      name: ['scroll', 'y'],
      tooltip: '如果需要纵向滚动，请设置y值来固定高度',
      props: {
        placeholder: 'eg: 600',
      },
    },
    {
      type: 'Select',
      label: '空值显示',
      name: ['empty'],
      tooltip: '列返回空时，展示的内容',
      props: {
        options: [
          { label: '无', value: '' },
          { label: '-', value: '-' },
          { label: '/', value: '/' },
        ],
      },
    },
    {
      type: 'Title',
      label: '列配置',
      key: 'columnConfig',
    },
    {
      type: 'Input',
      label: 'rowKey',
      name: ['rowKey'],
      tooltip: '建议把列表返回的唯一值设置为rowKey',
      props: {
        placeholder: 'eg: id',
      },
    },
    {
      type: 'function',
      key: 'TableSetting',
      render(form: FormInstance) {
        return <TableSetting key="TableSetting" form={form} />;
      },
    },
    {
      type: 'Title',
      label: '分页配置',
      key: 'pageConfig',
    },
    {
      type: 'Switch',
      label: '隐藏分页',
      name: ['hidePager'],
    },
    {
      type: 'Select',
      label: '显示位置',
      name: ['pagination', 'position'],
      props: {
        mode: 'multiple',
        options: [
          { label: '左上', value: 'topLeft' },
          { label: '右上', value: 'topRight' },
          { label: '左下', value: 'bottomLeft' },
          { label: '右下', value: 'bottomRight' },
        ],
      },
    },
    {
      type: 'InputNumber',
      label: '每页条数',
      name: ['pagination', 'pageSize'],
    },
    {
      type: 'Switch',
      label: '显示总条数',
      name: ['pagination', 'showTotal'],
    },
    {
      type: 'Switch',
      label: '显示切换器',
      name: ['pagination', 'showSizeChanger'],
    },
    {
      type: 'Switch',
      label: '显示跳转',
      name: ['pagination', 'showQuickJumper'],
    },
    {
      type: 'Title',
      label: '字段映射',
      key: 'fieldmap',
    },
    {
      type: 'Input',
      label: '页码',
      name: ['field', 'pageNum'],
    },
    {
      type: 'Input',
      label: '每页步长',
      name: ['field', 'pageSize'],
    },
    {
      type: 'Input',
      label: '总条数',
      name: ['field', 'total'],
    },
  ],
  config: {
    props: {
      rowKey: 'id',
      size: 'large',
      bordered: true,
      selectionType: '',
      leftTitle: '查询列表',
      empty: '-',
      // 组件默认属性值
      columns: [
        {
          title: '姓名',
          dataIndex: 'name',
          key: 'name',
          width: 90,
          align: 'center',
        },
        {
          title: '种类',
          dataIndex: 'type',
          key: 'type',
          width: 80,
          align: 'center',
        },
        {
          title: '头像',
          dataIndex: 'avatar',
          key: 'avatar',
          type: 'image',
          width: 90,
          align: 'center',
        },
        {
          title: '分布区域',
          dataIndex: 'area',
          key: 'area',
          width: 230,
        },
        {
          title: '繁殖周期',
          dataIndex: 'time',
          key: 'time',
          render: `function render(text,record){
    return text + "个月"
}`,
          width: 110,
        },
        {
          title: '技能',
          dataIndex: 'skill',
          key: 'skill',
          type: 'tag',
          width: 200,
          align: 'center',
        },
        {
          title: '售价',
          dataIndex: 'sales',
          key: 'sales',
          type: 'money',
          width: 90,
          align: 'center',
        },
        {
          title: '状态',
          dataIndex: 'status',
          key: 'status',
          type: 'status',
          width: 90,
          align: 'center',
          render: `function render(text,record){
    return {
      status: "processing",
      text: text
    }
}`,
        },
        {
          title: '创建时间',
          dataIndex: 'createdAt',
          key: 'createdAt',
          type: 'date1',
          width: 130,
          align: 'center',
        },
        {
          title: '操作',
          key: 'action',
          type: 'action',
          dataIndex: 'action',
          fixed: 'right',
          width: 220,
          align: 'center',
          list: [
            { text: '详情', type: 'link', eventName: 'DynamicDetail' },
            { text: '编辑', type: 'link', eventName: 'DynamicEdit' },
            { text: '删除', type: 'link', danger: true, eventName: 'DynamicDelete' },
          ],
        },
      ],
      hidePager: false,
      pagination: {
        total: 0,
        pageSize: 10,
        showSizeChanger: true,
        showQuickJumper: true,
        position: ['bottomRight'],
        pageSizeOptions: [10, 20, 50, 100],
        showTotal: true,
      },
      field: {
        pageNum: 'pageNum',
        pageSize: 'pageSize',
        total: 'total',
      },
    },
    // 组件样式
    style: {
      background: '#fff',
      padding: '0 20px',
      margin: '20px 0 0',
      border: '1px solid #e6e6e6',
      borderRadius: '3px',
    },
    events: [],
    api: {
      sourceType: 'json',
      sourceField: 'list',
      // 数据源
      source: [
        {
          id: 1001,
          name: '萤火虫',
          type: '昆虫',
          avatar: 'https://marsview.cdn.bcebos.com/s1.png',
          time: 10,
          skill: ['飞', '发光', '御敌'],
          sales: 9.9,
          status: '在售',
          createdAt: new Date().getTime(),
          area: '热带、亚热带和温带地区',
        },
      ],
    },
  },
  // 组件事件,动态事件需要以Dynamic开头
  events: [
    {
      value: 'onCheckedChange',
      name: '单选/多选事件',
    },
    {
      value: 'DynamicDetail',
      name: '点击查看事件',
    },
    {
      value: 'DynamicEdit',
      name: '点击编辑事件',
    },
    {
      value: 'DynamicDelete',
      name: '点击删除事件',
    },
  ],
  methods: [
    {
      name: 'search',
      title: '搜索',
    },
    {
      name: 'reload',
      title: '刷新',
    },
    {
      name: 'clearData',
      title: '清空列表',
    },
    {
      name: '开始Loading',
      title: 'startLoading',
    },
    {
      name: '结束Loading',
      title: 'stopLoading',
    },
    {
      name: 'checkSelectedRow',
      title: '判断是否选中一条',
    },
    {
      name: 'setSelectedRowKeys',
      title: '设置默认选中的Keys',
    },
    {
      name: 'getSelectedRowKeys',
      title: '获取选中的Keys',
    },
    {
      name: 'getSelectedRow',
      title: '获取选中的行数据',
    },
  ],
};
