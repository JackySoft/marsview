/**
 * 组件配置和属性值
 */

export default {
  // 组件属性配置JSON
  attrs: [
    {
      type: 'Title',
      label: '基础配置',
      name: 'basic',
    },
    {
      type: 'Input',
      label: '中心坐标',
      name: 'cityName',
      props: {
        placeholder: '城市或者经纬度,eg: 116.403795,39.914286',
      },
      tooltip: '输入经纬度时，逗号分割，纬度在前，经度在后',
    },
    {
      type: 'Slider',
      label: '缩放等级',
      name: 'zoom',
      props: {
        min: 1,
        max: 18,
        step: 1,
      },
    },
    {
      type: 'Switch',
      label: '滚轮缩放',
      name: 'wheelZoom',
    },
    {
      type: 'InputNumber',
      label: '旋转角度',
      name: 'rotateAngle',
    },
    {
      type: 'InputNumber',
      label: '倾斜角度',
      name: 'tiltAngle',
    },
    {
      type: 'Select',
      label: '地图模式',
      name: 'mapType',
      props: {
        options: [
          { value: 'BMAP_NORMAL_MAP', label: '标准地图' },
          { value: 'BMAP_EARTH_MAP', label: '地球模式' },
          { value: 'BMAP_SATELLITE_MAP', label: '卫星地图' },
        ],
      },
    },
    {
      type: 'Title',
      label: '控件配置',
      name: 'controls',
    },
    {
      type: 'Switch',
      label: '比例尺',
      name: 'ScaleControl',
    },
    {
      type: 'Switch',
      label: '缩放控件',
      name: 'ZoomControl',
    },
    {
      type: 'Switch',
      label: '城市控件',
      name: 'CityListControl',
    },
    {
      type: 'Switch',
      label: '定位控件',
      name: 'LocationControl',
    },
  ],
  config: {
    // 组件默认属性值
    props: {
      cityName: '北京市',
      zoom: 15,
      wheelZoom: true,
      mapType: 'BMAP_NORMAL_MAP',
      ScaleControl: true,
      ZoomControl: true,
      CityListControl: true,
      LocationControl: true,
    },
    style: {
      border: '3px solid #7d33ff',
      width: '100%',
      height: '600px',
    },
    events: [],
    api: {},
    source: '',
  },
  // 组件事件
  events: [
    {
      value: 'onLoaded',
      name: '加载完成事件',
    },
    {
      value: 'onClick',
      name: '地图单机事件',
    },
  ],
  // 组件接口
  api: {},
};
