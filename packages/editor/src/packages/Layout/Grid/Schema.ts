/**
 * 组件配置和属性值
 */

export default {
  // 组件属性配置JSON
  attrs: [
    {
      type: 'Input',
      label: '行比例',
      name: 'xRate',
      tooltip: 'grid-template-columns属性，假设3行，比例可以配1fr 1fr 1fr，或1fr 50px 100px',
    },
    {
      type: 'Input',
      label: '列比例',
      tooltip: 'grid-template-rows属性，假设3列，比例可以配1fr 1fr 1fr，或1fr 50px 100px',
      name: 'yRate',
    },
    {
      type: 'InputPx',
      label: '横向间隔',
      name: 'xGap',
    },
    {
      type: 'InputPx',
      label: '纵向间隔',
      name: 'yGap',
    },
  ],
  config: {
    // 组件默认属性值
    props: {
      xGap: '10px',
      yGap: '10px',
      xRate: '1fr 1fr 1fr',
      yRate: '1fr 1fr 1fr 100px',
    },
    style: {
      display: 'flex',
    },
    events: [],
    api: {},
    source: '',
  },
  // 组件事件
  events: [],
};
