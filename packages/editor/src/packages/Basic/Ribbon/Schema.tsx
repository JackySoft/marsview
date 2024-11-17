/**
 * 组件配置和属性值
 */
export default {
  // 组件属性配置JSON
  attrs: [
    {
      type: 'Title',
      label: '基础配置',
    },
    {
      type: 'Select',
      name: 'placement',
      label: '位置',
      props: {
        options: [
          { label: '前', value: 'start' },
          { label: '后', value: 'end' },
        ]
      }
    },
    {
      type: 'Input',
      name: 'text',
      label: '缎带文本',
    },
    {
      type: 'ColorPicker',
      name: 'color',
      label: '颜色',
      props: {
        placeholder: '请输入',
        defaultValue: '#f5222d',
      },
      tooltip: '自定义小圆点的颜色',
    }
  ],
  config: {
    // 组件默认属性值
    // 组件默认属性值
    props: {
      color: 'red',
      // width: 100,
      independentUse: false,
      ribbon: false,
      dot: true,
      offsetX: 0,
      offsetY: 0,
      count: 99,
      status: 'default',
      text: 'here',
      overflowCount: 99,
    },
    // 组件样式
    style: {},
    // 事件
    // 组件样式
  },
  // 组件事件
  events: [
  ],
  // 组件接口
  api: {},
};
