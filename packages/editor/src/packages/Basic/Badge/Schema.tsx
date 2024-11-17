
/**
 * 组件配置和属性值
 */
export default {
  // 组件属性配置JSON
  attrs: [
    {
      type: 'Title',
      label: '前置配置',
      key: 'pre',
    },
    {
      type: 'Switch',
      name: 'dot',
      label: '可选 点 | 数',
    },
    {
      type: 'Title',
      label: '点配置',
      key: 'basic',
    },
    {
      type: 'Select',
      label: '状态点配置',
      name: 'status',
      props: {
        defaultValue: 'warning',
        options: [
          { value: 'success', label: 'success' },
          { value: 'processing', label: 'processing' },
          { value: 'default', label: 'default' },
          { value: 'error', label: 'error' },
          { value: 'warning', label: 'warning' },
        ]
      }
    },
    {
      type: 'Title',
      label: '数配置',
      key: 'basic',
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
    },

    {
      type: 'Title',
      label: '通用配置',
      key: 'basic',
    },
    {
      type: 'InputNumber',
      label: 'X轴偏移',
      name: ['offsetX'],
      props: {
        placeholder: '请输入',
        addonAfter: 'px',
      },
    },
    {
      type: 'InputNumber',
      label: 'Y轴偏移',
      name: ['offsetY'],
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
        ]
      }
    },
    {
      type: 'Input',
      label: '鼠标悬浮文本',
      name: 'title',
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
  ],
  config: {
    // 组件默认属性值
    // 组件默认属性值
    props: {
      dot: true,
      // offsetX: 0,
      // offsetY: 0,
      // count: 99,
      status: 'default',
      // text: 'here',
      // overflowCount: 99,
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
