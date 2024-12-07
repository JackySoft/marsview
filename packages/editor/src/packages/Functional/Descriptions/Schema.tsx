/**
 * 组件配置和属性值
 */

import { FormInstance } from 'antd';
import DescItemSetting from './DescItemSetting';
export default {
  // 组件属性配置JSON
  attrs: [
    {
      type: 'Title',
      label: '基础设置',
      key: 'basic',
    },
    {
      type: 'Input',
      label: '标题',
      name: ['title'],
    },
    {
      type: 'Switch',
      label: '展示边框',
      name: ['bordered'],
    },
    {
      type: 'Switch',
      label: '展示冒号',
      name: ['colon'],
    },
    {
      type: 'InputNumber',
      label: '一行列数',
      name: ['column'],
    },
    {
      type: 'Select',
      label: '布局',
      name: ['layout'],
      tooltip: '文字和内容的排列',
      props: {
        options: [
          { value: 'horizontal', label: '水平' },
          { value: 'vertical', label: '垂直' },
        ],
      },
    },
    {
      type: 'Select',
      label: '列表大小',
      name: ['size'],
      props: {
        options: [
          { value: 'default', label: '默认' },
          { value: 'middle', label: '中等' },
          { value: 'small', label: '小号' },
        ],
      },
    },
    {
      type: 'Select',
      label: '空值显示',
      name: ['empty'],
      props: {
        options: [
          { label: '空', value: '' },
          { label: '-', value: '-' },
          { label: '/', value: '/' },
        ],
      },
    },
    {
      type: 'Title',
      label: '列表设置',
      key: 'ListSet',
    },
    {
      type: 'function',
      key: 'DescItemSetting',
      render(form: FormInstance) {
        return <DescItemSetting key="DescItemSetting" form={form} />;
      },
    },
  ],
  config: {
    // 组件默认属性值
    props: {
      title: '用户信息',
      colon: true,
      column: 3,
      layout: 'horizontal',
      size: 'default',
      empty: '-',
      items: [
        { label: '名称', name: 'name', type: 'text', span: 1 },
        { label: '类型', name: 'type', type: 'text', span: 1 },
        { label: '寿命', name: 'time', type: 'text', span: 1 },
        { label: '地区分布', name: 'area', type: 'text', span: 1 },
      ],
    },
    // 组件样式
    style: {},
    // 事件
    events: [],
    api: {
      sourceType: 'json',
      sourceField: 'data.list',
      // 数据源
      source: [
        {
          id: 1001,
          name: '萤火虫',
          type: '昆虫',
          avatar: `${import.meta.env.VITE_CDN_URL}/s1.png`,
          time: 10,
          skill: ['飞', '发光', '御敌'],
          sales: 9.9,
          createdAt: new Date().getTime(),
          area: '热带、亚热带和温带地区',
        },
      ],
    },
  },
  // 组件事件
  events: [
    {
      value: 'onClick',
      name: '点击事件',
    },
  ],
  methods: [
    {
      name: 'startLoading',
      title: '开始loading',
    },
    {
      name: 'endLoading',
      title: '结束loading',
    },
  ],
};
