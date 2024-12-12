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
      label: '标题',
      name: ['title'],
      props: {
        placeholder: '请输入 title 文字',
      },
    },
    {
      type: 'Variable',
      label: '子标题',
      name: ['subTitle'],
      props: {
        placeholder: '请输入 subTitle 文字',
      },
    },
    {
      type: 'Select',
      label: '状态',
      name: ['status'],
      props: {
        options: [
          { value: 'success', label: ' 成功型' },
          { value: 'error', label: '失败型' },
          { value: 'info', label: '提示型' },
          { value: 'warning', label: '警告型' },
          { value: '404', label: '404' },
          { value: '403', label: '403' },
          { value: '500', label: '500' },
        ],
      },
    },
    {
      type: 'Icons',
      label: '自定义图标',
      name: ['icon'],
      props: {
        placeholder: '请选择图标',
      },
    },
    {
      type: 'Title',
      label: '底部操作按钮',
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
      status: 'info',
      title: 'Your operation has been executed',
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
