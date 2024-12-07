import { FormInstance } from 'antd';
import ImagesSetting from './ImagesSetting';

/**
 * 组件配置和属性值
 */
export default {
  // 组件属性配置JSON
  attrs: [
    {
      type: 'Title',
      label: '图片尺寸',
      key: 'ImageSize',
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
      type: 'Title',
      label: '图片地址',
      key: 'ImageSrc',
    },
    {
      type: 'function',
      key: 'ImagesSetting',
      render(form: FormInstance) {
        return <ImagesSetting form={form} key="ImagesSetting" />;
      },
    },
    {
      type: 'Title',
      label: '轮播设置',
      key: 'carousel',
    },
    {
      type: 'Switch',
      label: '显示箭头',
      name: ['arrows'],
    },
    {
      type: 'Switch',
      label: '自动播放',
      name: ['autoplay'],
    },
    {
      type: 'InputNumber',
      label: '播放间隔',
      name: ['autoplaySpeed'],
      props: {
        min: 0,
        step: 1,
        placeholder: '请输入自动播放间隔（ms）',
      },
    },
    {
      type: 'Switch',
      label: '适应高度',
      name: ['adaptiveHeight'],
    },
    {
      type: 'Select',
      label: '点的位置',
      name: ['dotPosition'],
      props: {
        options: [
          { value: 'top', label: '顶部' },
          { value: 'bottom', label: '底部' },
          { value: 'left', label: '左侧' },
          { value: 'right', label: '右侧' },
        ],
      },
    },
    {
      type: 'Switch',
      label: '显示点',
      name: ['dots'],
    },
    {
      type: 'Switch',
      label: '是否可拖动',
      name: ['draggable'],
    },
    {
      type: 'Switch',
      label: '淡入效果',
      name: ['fade'],
    },
    {
      type: 'Switch',
      label: '循环播放',
      name: ['infinite'],
    },
    {
      type: 'InputNumber',
      label: '切换速度',
      name: ['speed'],
      props: {
        min: 0,
        step: 1,
        placeholder: '请输入切换速度（ms）',
      },
    },
    {
      type: 'Select',
      label: '过渡效果',
      name: ['easing'],
      props: {
        options: [
          { value: 'linear', label: '线性' },
          { value: 'ease', label: '缓动' },
          { value: 'ease-in', label: '加速' },
          { value: 'ease-out', label: '减速' },
          { value: 'ease-in-out', label: '加速减速' },
        ],
      },
    },
    {
      type: 'Select',
      label: '效果类型',
      name: ['effect'],
      props: {
        options: [
          { value: 'scrollx', label: '水平滚动' },
          { value: 'fade', label: '淡入淡出' },
        ],
      },
    },
    {
      type: 'Switch',
      label: '等待动画完成',
      name: ['waitForAnimate'],
    },
  ],
  config: {
    // 组件默认属性值
    props: {
      height: '160px',
      width: '100%',
      arrows: true,
      autoplay: false,
      autoplaySpeed: 3000,
      adaptiveHeight: false,
      dotPosition: 'bottom',
      dots: true,
      draggable: true,
      fade: false,
      infinite: true,
      speed: 500,
      easing: 'ease',
      effect: 'scrollx',
      waitForAnimate: true,
      imageUrls: [
        {
          url: 'https://imgcloud.cdn.bcebos.com/82286cf4f02d43345e3537100.gif',
        },
        {
          url: 'https://imgcloud.cdn.bcebos.com/d1b2fc06fb27a33c6796afc15.gif',
        },
      ],
    },
    // 组件样式
    style: {},
    // 事件
    events: [],
  },
  // 组件事件
  events: [
    {
      value: 'onAfterChange',
      name: '切换之后事件',
    },
    {
      value: 'onBeforeChange',
      name: '切换之前事件',
    },
  ],
  methods: [
    {
      name: 'show',
      title: '显示组件',
    },
    {
      name: 'hide',
      title: '隐藏组件',
    },
  ],
};
