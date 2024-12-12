import { FormInstance } from 'antd';
import ActionSetting from '@/components/BulkAction/ActionSetting';

/**
 * 组件配置和属性值
 */
export default {
  // 组件属性配置JSON
  attrs: [
    {
      type: 'Title',
      label: '基础设置',
      key: 'basic',
    },
    {
      type: 'Switch',
      label: '是否使用折叠',
      name: ['useCollapse'],
    },
    {
      type: 'Switch',
      label: '是否使用图标',
      name: ['useIcon'],
    },
    {
      type: 'InputNumber',
      label: '标签间距',
      name: ['tagGap'],
      props: {
        min: 4,
        max: 10,
      },
    },
    {
      type: 'Select',
      label: '标签大小',
      name: ['tagSize'],
      props: {
        options: [
          { label: '小', value: 'small' },
          { label: '中', value: 'middle' },
          { label: '大', value: 'large' },
        ],
      },
    },
  ],
  config: {
    // 组件默认属性值
    props: {
      tagGap: 4,
      tagSize: 'middle',
      useCollapse: false,
      useIcon: false,
    },
    // 组件样式
    style: {},
    // 事件
    events: [],
    api: {
      sourceType: 'json',
      // 数据源
      source: [
        { label: '电影', key: 'Movies', id: 1, icon: 'VideoCameraOutlined' },
        { label: '书籍', key: 'Books', id: 2, icon: 'BookOutlined' },
        { label: '音乐', key: 'Music', id: 3, icon: 'AudioOutlined' },
        { label: '体育', key: 'Sports', id: 4, icon: 'FutbolOutlined' },
        { label: '旅行', key: 'Travel', id: 5, icon: 'GlobalOutlined' },
        { label: '美食', key: 'Food', id: 6, icon: 'CoffeeOutlined' },
        { label: '技术', key: 'Technology', id: 7, icon: 'DesktopOutlined' },
        { label: '时尚', key: 'Fashion', id: 8, icon: 'AppstoreOutlined' },
        { label: '艺术', key: 'Art', id: 9, icon: 'AppstoreAddOutlined' },
        { label: '摄影', key: 'Photography', id: 10, icon: 'CameraOutlined' },
        { label: '健身', key: 'Fitness', id: 11, icon: 'PropertySafetyOutlined' },
        { label: '游戏', key: 'Gaming', id: 12, icon: 'ProductOutlined' },
        { label: '烹饪', key: 'Cooking', id: 13, icon: 'ForkOutlined' },
        { label: '自然', key: 'Nature', id: 14, icon: 'MessageOutlined' },
        { label: '健康', key: 'Health', id: 15, icon: 'HeartOutlined' },
      ],
    },
  },
  // 组件事件
  events: [
    {
      value: 'onChange',
      name: '标签激活变化事件',
    },
  ],
  methods: [
    {
      name: 'update',
      title: '更新数据',
    },
  ],
};
