import DynamicItemSetting from '@/packages/components/DynamicItemSetting';
import { FormInstance } from 'antd';

export default {
  attrs: [
    {
      type: 'Title',
      label: '基础设置',
    },
    {
      type: 'Input',
      label: '文本',
      name: 'text',
    },
    {
      type: 'Select',
      label: '类型',
      name: 'type',
      props: {
        options: [
          { value: 'primary', label: '主要' },
          { value: 'default', label: '默认' },
        ],
      },
    },
    {
      type: 'Select',
      label: '弹窗方向',
      name: 'placement',
      props: {
        options: [
          { value: 'top', label: '正上方' },
          { value: 'topLeft', label: '左上方' },
          { value: 'topRight', label: '右上方' },
          { value: 'bottom', label: '正下方' },
          { value: 'bottomLeft', label: '左下方' },
          { value: 'bottomRight', label: '右下方' },
        ],
      },
    },
    {
      type: 'Switch',
      label: '关闭销毁',
      name: 'destroyPopupOnHide',
    },
    {
      type: 'Variable',
      label: '是否禁用',
      name: ['disabled'],
    },
    {
      type: 'Title',
      label: '配置项',
    },
    {
      type: 'function',
      label: '动态列',
      name: 'itemConfig',
      render: (form: FormInstance) => {
        return <DynamicItemSetting labelSpan={8} form={form} name={'itemConfig'} />;
      },
    },
  ],
  config: {
    // 组件默认属性值
    props: {
      text: 'DropDown',
      type: 'default',
      placement: 'bottom',
      itemConfig: [],
    },
  },
  events: [
    {
      name: '配置项点击事件',
      value: 'onMenuClick'
    }
  ],
};
