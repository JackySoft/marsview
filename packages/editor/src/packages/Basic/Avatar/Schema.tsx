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
      type: 'Variable',
      label: '文字头像',
      name: ['textavatar'],
      props: {
        placeholder: '请输入',
      },
    },
    {
      type: 'Variable',
      label: '地址',
      name: ['src'],
      props: {
        placeholder: '图片地址',
      },
    },
    {
      type: 'InputSelect',
      label: '大小',
      name: ['size'],
      tooltip: '支持自定义大小，如: 10, "20px"',
      props: {
        options: [
          { value: 'large', label: 'large' },
          { value: 'small', label: 'small' },
          { value: 'default', label: 'default' },
        ],
      },
    },
    {
      type: 'Input',
      label: 'alt属性',
      name: ['alt'],
      tooltip: '图像无法显示时的替代文本',
      props: {
        placeholder: '请输入',
      },
    },
    {
      type: 'InputNumber',
      label: '文字边距',
      name: ['gap'],
      tooltip: '文字头像距离左右两侧距离',
      props: {
        placeholder: '请输入',
      },
    },
    {
      type: 'Select',
      label: '形状',
      name: ['shape'],
      props: {
        options: [
          { value: 'circle', label: '圆形' },
          { value: 'square', label: '方形' },
        ],
      },
    },
  ],
  config: {
    // 组件默认属性值
    props: {
      textavatar: 'wang',
      size: 'large',
      shape: 'circle',
      crossOrigin: 'anonymous',
      gap: 4,
    },
    // 组件样式
    style: {},
    // 事件
    events: [],
  },
  // 组件事件
  events: [],
  methods: [],
};
