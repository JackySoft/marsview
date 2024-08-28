import { FormInstance } from 'antd';
import ActionSetting from '@/components/BulkAction/ActionSetting';
export default {
  attrs: [
    {
      type: 'Title',
      label: '右上角操作栏',
    },
    {
      type: 'function',
      render(form: FormInstance) {
        return <ActionSetting key="ActionSetting" form={form} />;
      },
    },
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
      type: 'Input',
      label: '高度',
      name: ['height'],
    },
    {
      type: 'Input',
      label: '宽度',
      name: ['width'],
    },
    {
      type: 'Switch',
      label: '销毁关闭',
      name: ['destroyOnClose'],
    },
    {
      type: 'Switch',
      label: '键盘ESC关闭',
      name: ['keyboard'],
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
  ],
  config: {
    props: {
      title: '抽屉',
      destroyOnClose: true,
      height: '40%',
      width: '30%',
      keyboard: true,
      mask: true,
      maskClosable: true,
      placement: 'right',
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
