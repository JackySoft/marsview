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
      label: '当前步骤',
      name: ['current'],
    },
    {
      type: 'Select',
      label: '步骤条方向',
      name: ['direction'],
      props: {
        options: [
          { value: 'horizontal', label: '水平' },
          { value: 'vertical', label: '垂直' },
        ],
      },
    },
    {
      type: 'Switch',
      label: '点状步骤条',
      name: ['progressDot'],
    },
    {
      type: 'Select',
      label: '标签位置',
      name: ['labelPlacement'],
      props: {
        options: [
          { value: 'horizontal', label: '水平' },
          { value: 'vertical', label: '垂直' },
        ],
      },
    },
    {
      type: 'InputNumber',
      label: '当前进度',
      name: ['percent'],
      tooltip: '当前 process 步骤显示的进度条进度（只对基本类型的 Steps 生效，取值0-100）',
    },
    {
      type: 'Switch',
      label: '响应式',
      name: ['responsive'],
    },
    {
      type: 'Select',
      label: '尺寸',
      name: ['size'],
      props: {
        options: [
          { value: 'default', label: '默认' },
          { value: 'small', label: '迷你' },
        ],
      },
    },
    {
      type: 'Select',
      label: '当前状态',
      name: ['status'],
      props: {
        options: [
          { value: 'wait', label: '等待中' },
          { value: 'process', label: '处理中' },
          { value: 'finish', label: '已完成' },
          { value: 'error', label: '失败' },
        ],
      },
    },
    {
      type: 'Select',
      label: '步骤类型',
      name: ['type'],
      props: {
        options: [
          { value: 'default', label: '默认' },
          { value: 'navigation', label: '导航型' },
          { value: 'inline', label: '嵌入型' },
        ],
      },
    },
  ],
  config: {
    // 组件默认属性值
    props: {
      current: 0,
      direction: 'horizontal',
      labelPlacement: 'horizontal',
      responsive: true,
      progressDot: false,
    },
    // 组件样式
    style: {},
    // 事件
    events: [],
    // 接口配置
    api: {
      sourceType: 'json',
      source: [
        {
          title: '第一步',
          description: '开始',
        },
        {
          title: '第二步',
          description: '进行中',
          subTitle: '加速中',
        },
        {
          title: '第三步',
          description: '结束',
        },
      ],
    },
  },
  // 组件事件
  events: [
    {
      value: 'onChange',
      name: '值变化事件',
    },
  ],
  methods: [
    {
      name: 'update',
      title: '更新数据',
    },
    {
      name: '更新步骤',
      title: 'updateStep',
    },
  ],
};
