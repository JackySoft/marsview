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
      link: {
        url: 'https://api.map.baidu.com/lbsapi/getpoint/index.html',
        label: '坐标拾取',
      },
    },
    {
      type: 'Input',
      label: '中心坐标',
      name: 'center',
      props: {
        placeholder: '城市或者经纬度,eg: 116.403795,39.914286',
      },
      tooltip: '输入经纬度时，逗号分割',
    },
    {
      type: 'Slider',
      label: '缩放等级',
      name: 'zoom',
      props: {
        min: 3,
        max: 19,
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
      props: {
        placeholder: '旋转角度，范围0-360',
      },
    },
    {
      type: 'InputNumber',
      label: '倾斜角度',
      name: 'tiltAngle',
      props: {
        placeholder: '倾斜角度，范围0-90',
      },
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
    {
      type: 'Title',
      label: 'POI配置',
      name: 'poi',
    },
    {
      type: 'Switch',
      label: '显示名称',
      name: 'showText',
    },
    {
      type: 'Switch',
      label: '显示图标',
      name: 'showIcon',
    },
    {
      type: 'Switch',
      label: '显示覆盖物',
      name: 'showOverlay',
    },
  ],
  config: {
    // 组件默认属性值
    props: {
      center: '北京市',
      zoom: 15,
      wheelZoom: true,
      mapType: 'BMAP_NORMAL_MAP',
      ScaleControl: false,
      ZoomControl: true,
      CityListControl: false,
      LocationControl: false,
      showText: true,
      showIcon: true,
      showOverlay: true,
    },
    style: {
      width: '100%',
      height: '600px',
    },
    events: [],
    api: {
      sourceType: 'json',
      source: [
        {
          type: 'marker3D',
          lng: 116.424319,
          lat: 39.923319,
          height: 0, // 距离地面高度
          style: {
            size: 10,
            shape: 'BMAP_SHAPE_CIRCLE',
            fillColor: 'red',
            fillOpacity: 1,
          },
        },
        {
          type: 'label',
          lng: 116.424319,
          lat: 39.923319,
          offset: {
            x: -50,
            y: 10,
          },
          text: '我是文本，灯市口',
          style: {
            color: '#fff',
            backgroundColor: '#9d5cff',
            borderColor: '#fff',
            borderRadius: '5px',
            padding: '5px',
          },
        },
        {
          type: 'infoWindow',
          lng: 116.424319,
          lat: 39.923319,
          options: {
            width: 100,
            height: 50,
            title: '信息窗口',
            message: '信息窗口内容',
          },
          text: '显示文本内容',
        },
        {
          type: 'marker3D',
          lng: 116.409659,
          lat: 39.948768,
          height: 0, // 距离地面高度
          style: {
            size: 10,
            shape: 'BMAP_SHAPE_CIRCLE',
            fillColor: '#78ff67',
            fillOpacity: 1,
          },
        },
        {
          type: 'label',
          lng: 116.409659,
          lat: 39.948768,
          offset: {
            x: -10,
            y: 10,
          },
          text: '60',
          style: {
            color: 'red',
            backgroundColor: '#fff',
            borderColor: '#fff',
            borderRadius: '5px',
          },
        },
        {
          type: 'marker3D',
          lng: 116.326871,
          lat: 39.927524,
          height: 0, // 距离地面高度
          style: {
            size: 10,
            shape: 'BMAP_SHAPE_CIRCLE',
            fillColor: '#78ff67',
            fillOpacity: 1,
          },
        },
        {
          type: 'label',
          lng: 116.326871,
          lat: 39.927524,
          offset: {
            x: -10,
            y: 10,
          },
          text: '100',
          style: {
            color: 'red',
            backgroundColor: '#fff',
            borderColor: '#fff',
            borderRadius: '5px',
          },
        },
      ],
    },
    source: '',
  },
  // 组件事件
  events: [
    {
      value: 'onClick',
      name: '地图单击事件',
    },
  ],
  methods: [
    {
      name: 'setZoom',
      title: '设置缩放等级',
    },
    {
      name: 'setZoom',
      title: '获取中心点坐标',
    },
  ],
};
