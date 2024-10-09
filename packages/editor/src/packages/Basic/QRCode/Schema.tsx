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
      label: '扫描后的结果',
      name: 'value',
      props: {
        placeholder: '请输入',
      },
    },
    {
      type: 'Select',
      label: '渲染类型',
      name: 'type',
      props: {
        options: [
          { value: 'canvas', label: 'canvas' },
          { value: 'svg', label: 'svg' },
        ],
      },
    },
    {
      type: 'Variable',
      label: '图片地址',
      name: 'icon',
      tooltip: '二维码中图片的地址（目前只支持图片地址）',
      props: {
        placeholder: '请输入图片地址',
      },
    },
    {
      type: 'InputNumber',
      label: '二维码大小',
      name: 'size',
      props: {
        placeholder: '二维码大小',
      },
    },
    {
      type: 'InputNumber',
      label: '图片宽度',
      name: ['iconSize', 'width'],
      props: {
        placeholder: '二维码中图片的宽度',
      },
    },
    {
      type: 'InputNumber',
      label: '图片高度',
      name: ['iconSize', 'height'],
      props: {
        placeholder: '二维码中图片的高度',
      },
    },
    {
      type: 'Variable',
      label: '二维码颜色',
      name: 'color',
      props: {
        placeholder: '请输入',
      },
    },
    {
      type: 'Variable',
      label: '二维码背景颜色',
      name: 'bgColor',
      props: {
        placeholder: '请输入',
      },
    },
    {
      type: 'Switch',
      label: '是否有边框',
      name: 'bordered',
    },
    {
      type: 'Select',
      label: '纠错等级',
      name: 'errorLevel',
      props: {
        options: [
          { value: 'L', label: 'L' },
          { value: 'M', label: 'M' },
          { value: 'Q', label: 'Q' },
          { value: 'H', label: 'H' },
        ],
      },
    },
    {
      type: 'Select',
      label: '二维码状态',
      name: 'status',
      props: {
        options: [
          { value: 'active', label: 'active' },
          { value: 'expired', label: 'expired' },
          { value: 'loading', label: 'loading' },
          { value: 'scanned', label: 'scanned' },
        ],
      },
    },
  ],
  config: {
    // 组件默认属性值
    props: {
      value: 'https://ant.design',
      type: 'canvas',
      size: 160,
      icon: 'https://gw.alipayobjects.com/zos/rmsportal/KDpgvguMpGfqaHPjicRK.svg',
      iconSize: { width: 40, height: 40 },
      color: '#000',
      bgColor: 'transparent',
      bordered: true,
      errorLevel: 'M',
      status: 'active',
    },
    // 组件样式
    style: {},
    // 事件
    events: [],
  },
  // 组件事件
  events: [],
  methods: [
    {
      name: 'changeQRCodeStatus',
      title: '改变二维码状态',
      params: [
        {
          name: 'status',
          title: '状态值',
          required: true,
          type: 'select',
          options: [
            { value: 'active', label: 'active' },
            { value: 'expired', label: 'expired' },
            { value: 'loading', label: 'loading' },
            { value: 'scanned', label: 'scanned' },
          ],
        },
        {
          name: 'text',
          title: '测试参数',
          type: 'input',
        },
      ],
    },
  ],
};
