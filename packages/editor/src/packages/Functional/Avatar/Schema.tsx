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
      label: '图片地址',
      name: ['src'],
      props: {
        placeholder: '图片地址',
      },
    },
    {
      type: 'InputSelect',
      label: '头像大小',
      name: ['size'],
      tooltip: '可以选择图像系统默认大小或者手动输入像素值',
      props: {
        options: [
          { value: 'large', label: 'large' },
          { value: 'small', label: 'small' },
          { value: 'default', label: 'default' },
        ],
      },
    },
    {
      type: 'Variable',
      label: '替代文本',
      name: ['alt'],
      tooltip: '图像无法显示时的替代文本',
      props: {
        placeholder: '请输入',
      },
    },
    {
      type: 'InputNumber',
      label: '边界距离',
      name: ['gap'],
      tooltip: '字符类型距离左右两侧边界单位像素',
      props: {
        placeholder: '请输入',
      },
    },
    {
      type: 'Select',
      label: '头像形状',
      name: ['shape'],
      tooltip: '指定头像的形状',
      props: {
        options: [
          { value: 'circle', label: 'circle' },
          { value: 'square', label: 'square' },
        ],
      },
    },
    {
      type: 'Select',
      label: 'draggable',
      name: ['draggable'],
      tooltip: '图片是否允许拖动',
      props: {
        placeholder: '图片是否允许拖动',
        options: [
          { value: 'true', label: 'true' },
          { value: 'false', label: 'false' },
        ],
      },
    },
    {
      type: 'Select',
      label: 'CORS设置',
      name: ['crossOrigin'],
      tooltip: 'CORS属性设置',
      props: {
        placeholder: 'CORS属性设置',
        allowClear: true,
        options: [
          { value: 'anonymous', label: 'anonymous' },
          { value: 'use-credentials', label: 'use-credentials' },
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
      draggable: 'true',
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
