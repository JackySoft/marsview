/**
 * 组件配置和属性值
 */
import ActionSetting from '@/components/BulkAction/ActionSetting';
import { FormInstance } from 'antd';
export default {
  // 组件属性配置JSON
  attrs: [
    {
      type: 'Title',
      label: '基础配置',
      key: 'basic',
    },
    {
      type: 'Select',
      label: '布局',
      name: 'itemLayout',
      props: {
        options: [
          { label: '横向', value: 'horizontal' },
          { label: '纵向', value: 'vertical' },
        ],
      },
    },
    {
      type: 'Input',
      label: '头部标题',
      name: 'header',
    },
    {
      type: 'Input',
      label: '底部标题',
      name: 'footer',
    },
    {
      type: 'Switch',
      label: '显示边框',
      name: 'bordered',
    },
    {
      type: 'Select',
      label: 'List尺寸',
      name: 'size',
      props: {
        options: [
          { label: '默认', value: 'default' },
          { label: '大', value: 'large' },
          { label: '小', value: 'small' },
        ],
      },
    },
    {
      type: 'Switch',
      label: '显示分割线',
      name: 'split',
    },
    {
      type: 'Title',
      label: 'Meta配置',
      key: 'Meta',
    },
    {
      type: 'Input',
      label: '头像字段',
      name: 'avatar',
    },
    {
      type: 'Input',
      label: '标题字段',
      name: ['title', 'name'],
    },
    {
      type: 'ColorPicker',
      label: '标题颜色',
      name: ['title', 'color'],
    },
    {
      type: 'Switch',
      label: '使用图标',
      name: ['useIcon'],
    },
    {
      type: 'Input',
      label: '图标字段',
      name: ['icon'],
      tooltip: '开启图标后，接口可返回Antd的图标名称，用来替换头像',
    },
    {
      type: 'Input',
      label: '描述字段',
      name: ['desc', 'name'],
    },
    {
      type: 'ColorPicker',
      label: '描述颜色',
      name: ['desc', 'color'],
    },
    {
      type: 'Title',
      label: '内容配置',
      key: 'content',
    },
    {
      type: 'Input',
      label: '内容字段',
      name: ['content', 'name'],
    },
    {
      type: 'ColorPicker',
      label: '内容颜色',
      name: ['content', 'color'],
    },
    {
      type: 'Select',
      label: '展示类型',
      name: ['content', 'type'],
      props: {
        options: [
          { value: 'text', label: '文本' },
          { value: 'date1', label: '日期-不含时分秒' },
          { value: 'date2', label: '日期-包含时分秒' },
          { value: 'money', label: '金额千分位' },
          { value: 'number', label: '数字千分位' },
          { value: 'tag', label: '标签' },
        ],
      },
    },
    {
      type: 'Title',
      label: '批量操作栏',
    },
    {
      type: 'function',
      render(form: FormInstance) {
        return <ActionSetting key="ActionSetting" form={form} />;
      },
    },
  ],
  config: {
    // 组件默认属性值
    props: {
      size: 'default',
      bordered: false,
      split: true,
      itemLayout: 'horizontal',
      header: '列表标题',
      footer: '列表底部',
      avatar: 'avatar',
      title: {
        name: 'name',
        color: '#000',
      },
      desc: {
        name: 'remark',
        color: '',
      },
      content: {
        name: 'content',
        color: '#000',
        type: 'money',
      },
      bulkActionList: [],
      useIcon: false,
      icon: 'icon',
    },
    style: {
      padding: '20px',
    },
    events: [],
    api: {
      sourceType: 'json',
      // 数据源
      source: [
        {
          id: 1,
          name: '上海分店',
          remark: '20%利润',
          avatar: `${import.meta.env.VITE_CDN_URL}/s1.png`,
          content: '12423',
        },
        {
          id: 2,
          name: '深圳分店',
          remark: '70%利润',
          avatar: `${import.meta.env.VITE_CDN_URL}/s1.png`,
          content: '10999',
        },
        {
          id: 3,
          name: '北京分店',
          remark: '35%利润',
          avatar: `${import.meta.env.VITE_CDN_URL}/s1.png`,
          content: '30999',
        },
      ],
    },
  },
  // 组件事件
  events: [],
};
