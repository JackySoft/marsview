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
      type: 'Input',
      label: '描述',
      name: ['description'],
    },
    {
      type: 'InputSelect',
      label: '图片',
      name: ['image'],
      tooltip: '可以选择系统默认或者手动输入图片地址',
      props: {
        options: [
          { value: 'simple', label: '简单' },
          { value: 'default', label: '默认' },
        ],
      },
    },
    {
      type: 'InputNumber',
      label: '图片宽度',
      name: ['imageStyle', 'width'],
      props: {
        placeholder: '请输入图片宽度',
      },
    },
    {
      type: 'InputNumber',
      label: '图片高度',
      name: ['imageStyle', 'height'],
      props: {
        placeholder: '请输入图片高度',
      },
    },
  ],
  config: {
    // 组件默认属性值
    props: {
      description: '暂无数据',
      image: 'default',
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
