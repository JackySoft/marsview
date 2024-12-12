import { FormInstance } from 'antd';
import ActionSetting from '@/components/BulkAction/ActionSetting';
export default {
  attrs: [
    {
      type: 'Title',
      label: '基础配置',
      key: 'basic',
    },
    {
      type: 'Variable',
      label: '标题',
      name: ['title'],
    },
    {
      type: 'Select',
      label: '抽屉方向',
      name: ['placement'],
      props: {
        options: [
          { label: '顶部', value: 'top' },
          { label: '右侧', value: 'right' },
          { label: '底部', value: 'bottom' },
          { label: '左侧', value: 'left' },
        ],
      },
    },
    {
      type: 'InputPx',
      label: '宽度',
      name: ['width'],
    },
    {
      type: 'InputPx',
      label: '高度',
      name: ['height'],
    },
    {
      type: 'RadioGroup',
      label: '尺寸',
      name: ['size'],
      props: {
        options: [
          { label: '默认', value: 'default' },
          { label: '大号', value: 'large' },
        ],
      },
    },
    {
      type: 'Switch',
      label: '显示关闭',
      name: ['closable'],
    },
    {
      type: 'Switch',
      label: '销毁',
      name: ['destroyOnClose'],
      tooltip: '关闭抽屉时，销毁子元素',
    },
    {
      type: 'Switch',
      label: 'ESC关闭',
      name: ['keyboard'],
      tooltip: '按ESC键关闭抽屉',
    },
    {
      type: 'Switch',
      label: '遮罩',
      name: ['mask'],
    },
    {
      type: 'Switch',
      label: '点击遮罩关闭',
      name: ['maskClosable'],
    },
    {
      type: 'Title',
      label: '样式配置',
      key: 'headerStyle',
    },
    {
      type: 'Input',
      label: '头部填充',
      name: ['styles', 'header', 'padding'],
      props: {
        placeholder: 'eg: 16px 24px',
      },
    },
    {
      type: 'Input',
      label: '头部下边框',
      name: ['styles', 'header', 'borderBottom'],
      props: {
        placeholder: 'eg: 1px solid rgba(5, 5, 5, 0.06)',
      },
    },
    {
      type: 'Input',
      label: '内容填充',
      name: ['styles', 'body', 'padding'],
      props: {
        placeholder: 'eg: 16px 24px',
      },
    },
    {
      type: 'Title',
      label: '右上角操作栏',
      key: 'ExtraAction',
    },
    {
      type: 'function',
      render(form: FormInstance) {
        return <ActionSetting key="ActionSetting" form={form} />;
      },
    },
  ],
  config: {
    props: {
      title: '抽屉',
      closable: true,
      size: 'default',
      placement: 'right',
      keyboard: true,
      mask: true,
      maskClosable: true,
      destroyOnClose: false,
    },
    // 组件样式
    style: {},
  },
  events: [
    {
      value: 'onClose',
      name: '关闭抽屉事件',
    },
    {
      value: 'onAfterOpenChange',
      name: '切换抽屉结束事件',
    },
  ],
  methods: [
    {
      name: 'show',
      title: '打开抽屉',
    },
    {
      name: 'hide',
      title: '关闭抽屉',
    },
    {
      name: 'showLoading',
      title: '显示加载Loading',
    },
    {
      name: 'hideLoading',
      title: '隐藏加载Loading',
    },
  ],
};
