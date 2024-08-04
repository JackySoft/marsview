import { FormInstance } from 'antd';
import TabSetting from './TabSetting';
import { createId } from '@/packages/utils/util';

const id = createId('Tab');
/**
 * 组件配置和属性值
 */
export default {
  // 组件属性配置JSON
  attrs: [
    {
      type: 'Title',
      label: '页签配置',
      key: 'tabs-title',
    },
    {
      type: 'function',
      render(form: FormInstance) {
        return <TabSetting key="tab-setting" form={form} />;
      },
    },
    {
      type: 'Title',
      label: '基础配置',
      key: 'basic',
    },
    {
      type: 'Variable',
      label: '激活值',
      name: ['activeKey'],
    },
    {
      type: 'Input',
      label: '初始值',
      name: ['defaultActiveKey'],
    },
    {
      type: 'Switch',
      label: '标签居中',
      name: ['centered'],
    },
    {
      type: 'Switch',
      label: '隐藏加号',
      name: ['hideAdd'],
    },
    {
      type: 'Select',
      label: '尺寸',
      name: ['size'],
      props: {
        options: [
          { value: 'large', label: 'large' },
          { value: 'middle', label: 'middle' },
          { value: 'small', label: 'small' },
        ],
      },
    },
    {
      type: 'InputNumber',
      label: 'Tab间隙',
      name: ['tabBarGutter'],
    },
    {
      type: 'Select',
      label: '页签位置',
      name: ['tabPosition'],
      props: {
        options: [
          { value: 'top', label: 'top' },
          { value: 'right', label: 'right' },
          { value: 'bottom', label: 'bottom' },
          { value: 'left', label: 'left' },
        ],
      },
    },
    {
      type: 'Switch',
      label: '隐藏销毁',
      name: ['destroyInactiveTabPane'],
    },
    {
      type: 'Select',
      label: '页签样式',
      name: ['type'],
      props: {
        options: [
          { value: 'line', label: 'line' },
          { value: 'card', label: 'card' },
          { value: 'editable-card', label: 'editable-card' },
        ],
      },
    },
  ],
  config: {
    // 组件默认属性值
    props: {
      type: 'line',
      size: 'middle',
      tabPosition: 'top',
      activeKey: undefined,
      centered: false,
      hideAdd: true,
      destroyInactiveTabPane: false,
      items: [
        {
          id,
          key: 'active1',
          label: 'Tab1',
        },
      ],
    },
    // 组件样式
    style: {},
    // 事件
    events: [],
  },
  // 子组件
  elements: [
    {
      id,
      type: 'Tab',
      name: '子标签',
    },
  ],
  // 组件事件
  events: [
    {
      value: 'onTabClick',
      name: '点击事件',
    },
    {
      value: 'onChange',
      name: '切换事件',
    },
  ],
  methods: [],
};
