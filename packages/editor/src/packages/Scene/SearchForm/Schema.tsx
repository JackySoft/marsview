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
      label: '按钮配置',
    },
    {
      type: 'Input',
      label: '查询文本',
      name: ['form', 'submitText'],
    },
    {
      type: 'Input',
      label: '重置文本',
      name: ['form', 'resetText'],
    },
  ],
  config: {
    props: {
      // 组件默认属性值
      form: {
        submitText: '查询',
        resetText: '重置',
      },
    },
    // 组件样式
    style: {
      backgroundColor: '#ffffff',
      padding: '20px 10px',
      border: '1px solid #e6e6e6',
      borderRadius: '3px',
    },
    events: [],
    api: {},
  },
  // 组件事件
  events: [
    {
      value: 'onSearch',
      name: '查询事件',
    },
    {
      value: 'onReset',
      name: '重置事件',
    },
    {
      value: 'onChange',
      name: '值变化事件',
    },
  ],
  methods: [
    {
      name: 'reset',
      title: '表单重置',
    },
    {
      name: 'submit',
      title: '表单提交',
    },
    {
      name: 'init',
      title: '表单赋值',
    },
    {
      name: 'getFormData',
      title: '获取表单数据',
    },
  ],
};
