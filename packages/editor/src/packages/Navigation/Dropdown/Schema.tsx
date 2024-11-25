import DynamicItemSetting from '@/packages/components/dynamicItemSetting';

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
      type: 'Icons',
      label: '文字图标',
      name: 'textIcon',
    },
    {
      type: 'Select',
      label: '弹窗方向',
      name: 'placement',
      props: {
        options: [
          { value: 'top', label: 'top' },
          { value: 'topLeft', label: 'topLeft' },
          { value: 'topRight', label: 'topRight' },
          { value: 'bottom', label: 'bottom' },
          { value: 'bottomLeft', label: 'bottomLeft' },
          { value: 'bottomRight', label: 'bottomRight' },
        ],
      },
    },
    {
      type: 'Switch',
      label: '关闭销毁',
      name: 'destroyPopupOnHide',
    },
    {
      type: 'function',
      label: '动态列',
      name: 'itemConfig',
      render: () => {
        return <DynamicItemSetting />;
      },
    },
  ],
  config: {
    // 组件默认属性值
    props: {
      text: 'DropDown',

      // closable: true,
      // footer: true,
      // open: true,
      // okText: '确定',
      // cancelText: '取消',
      // destroyOnClose: false,
      // confirmLoading: false,
    },
  },
  events: [
    {
      value: 'onLoad',
      name: '初始化事件',
    },
    {
      value: 'onOk',
      name: '确认事件',
    },
    {
      value: 'onCancel',
      name: '取消事件',
    },
  ],
};
