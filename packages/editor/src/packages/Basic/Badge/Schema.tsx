/**
 * 组件配置和属性值
 */
export default {
  // 组件属性配置JSON
  attrs: [
    {
      type: 'Title',
      label: '数字配置',
      key: 'PreConfig',
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
    },
    {
      type: 'InputNumber',
      label: '展示数字',
      name: 'count',
      props: {
        placeholder: '请输入',
        addonAfter: '',
      },
    },
    {
      type: 'InputNumber',
      label: '封顶数字',
      name: ['overflowCount'],
      props: {
        placeholder: '请输入',
      },
    },
    {
      type: 'Switch',
      label: '展示零',
      name: 'showZero',
      tooltip: '为0时是否展示',
    },
    {
      type: 'InputNumber',
      label: 'X轴偏移',
      name: ['offset', 0],
      props: {
        placeholder: '请输入',
        addonAfter: 'px',
      },
    },
    {
      type: 'InputNumber',
      label: 'Y轴偏移',
      name: ['offset', 1],
      props: {
        placeholder: '请输入',
        addonAfter: 'px',
      },
    },
    {
      type: 'Select',
      name: 'size',
      label: '大小',
      props: {
        options: [
          { value: 'default', label: 'default' },
          { value: 'small', label: 'small' },
        ],
      },
    },
    {
      type: 'Switch',
      name: 'dot',
      label: '关闭数字',
    },
    {
      type: 'Title',
      label: '状态配置',
      key: 'DotConfig',
    },
    {
      type: 'Select',
      label: '点状态',
      name: 'status',
      props: {
        defaultValue: 'warning',
        options: [
          { value: 'success', label: 'success' },
          { value: 'processing', label: 'processing' },
          { value: 'default', label: 'default' },
          { value: 'error', label: 'error' },
          { value: 'warning', label: 'warning' },
        ],
      },
    },
    {
      type: 'Input',
      label: '点文本',
      name: 'text',
      tooltip: '仅在设置点状态下生效',
    },
    {
      type: 'Input',
      label: '悬浮文字',
      name: 'title',
      tooltip: '仅在设置点状态下生效',
    },
  ],
  config: {
    // 组件默认属性值
    // 组件默认属性值
    props: {
      dot: false,
      offsetX: 0,
      offsetY: 0,
      count: 99,
      status: 'default',
    },
    // 组件样式
    style: {},
    // 事件
    // 组件样式
  },
  // 组件事件
  events: [],
  // 组件接口
  api: {},
};
