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
      key: 'modal-basic',
    },
    {
      type: 'Variable',
      label: '标题',
      name: 'title',
    },
    {
      type: 'InputPx',
      label: '弹框宽度',
      name: 'width',
    },
    {
      type: 'Switch',
      label: '显示关闭',
      name: 'closable',
    },

    {
      type: 'Input',
      label: '确认文本',
      name: 'okText',
    },
    {
      type: 'Input',
      label: '取消文本',
      name: 'cancelText',
    },
    {
      type: 'Switch',
      label: '关闭后销毁',
      name: 'destroyOnClose',
    },
    {
      type: 'Title',
      label: '底部按钮配置',
      key: 'FooterAction',
    },
    {
      type: 'Switch',
      label: '显示页脚',
      name: 'footer',
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
      title: '弹框',
      closable: true,
      footer: true,
      open: true,
      okText: '确定',
      cancelText: '取消',
      destroyOnClose: false,
      confirmLoading: false,
    },
    // 组件样式
    style: {},
  },
  // 组件事件
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
  methods: [
    {
      name: 'open',
      title: '打开弹框',
    },
    {
      name: 'close',
      title: '关闭弹框',
    },
    {
      name: 'showConfirmLoading',
      title: '确认Loading',
    },
    {
      name: 'hideConfirmLoading',
      title: '隐藏确认Loading',
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
