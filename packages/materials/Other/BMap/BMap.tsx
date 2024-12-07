import { ComponentType } from '@materials/types';
import { handleApi } from '@materials/utils/handleApi';
import { createId, isNotEmpty, loadScript } from '@materials/utils/util';
import { usePageStore } from '@materials/stores/pageStore';
import { useState, useImperativeHandle, forwardRef, useEffect } from 'react';

/**
 *
 * @param props 组件本身属性
 * @param style 组件样式
 * @returns
 */
const MBMap = ({ config, onClick }: ComponentType, ref: any) => {
  const [visible, setVisible] = useState(true);
  const [mapId, setMapId] = useState('');
  const [map, setMap] = useState<any>(null);
  const [scaleControl, setScaleControl] = useState<any>(null);
  const [locationControl, setLocationControl] = useState<any>(null);
  const [zoomControl, setZoomControl] = useState<any>(null);
  const [cityListControl, setCityListControl] = useState<any>(null);
  const [data, setData] = useState<any>(null);

  const variableData = usePageStore((state) => state.page.pageData.variableData);

  window.initMapScript = () => {
    // 确保每个地图都有唯一的ID
    setMapId(createId('BMap'));
    setScaleControl(new window.BMapGL.ScaleControl());
    setZoomControl(new window.BMapGL.ZoomControl());
    setCityListControl(new window.BMapGL.CityListControl());
    setLocationControl(new window.BMapGL.LocationControl());
  };

  // 按需加载地图SDK
  useEffect(() => {
    if (window.BMapGL) {
      window.initMapScript();
    } else {
      loadScript('https://api.map.baidu.com/api?v=1.0&&type=webgl&ak=B8e7XVw1JMDwkAO7Ok6Z6unePqLWo8pH&callback=initMapScript');
    }
  }, []);

  // 地图初始化
  useEffect(() => {
    if (!mapId) return;
    const map = new window.BMapGL.Map(mapId);
    // 默认显示北京中心点
    map.centerAndZoom(config.props.center, config.props.zoom || 15);
    // 监听点击事件
    map.addEventListener('click', function ({ latlng: { lat, lng } }: any) {
      onClick?.({
        lat,
        lng,
      });
    });
    setMap(map);
  }, [mapId]);

  useEffect(() => {
    if (!mapId || !map) return;
    const { center, zoom } = config.props;
    // 设置当前城市
    if (center.trim()) {
      const [lat, lng] = center.split(',');
      if (lat && lng) {
        map.centerAndZoom(new window.BMapGL.Point(lat, lng), zoom || 15);
      } else {
        map.centerAndZoom(center, zoom || 15);
      }
    } else {
      map.centerAndZoom('北京市', zoom || 15);
    }
  }, [config.props.center, config.props.zoom]);

  // 动态添加地图配置
  useEffect(() => {
    if (!mapId || !map) return;
    const {
      wheelZoom,
      rotateAngle,
      tiltAngle,
      mapType,
      ScaleControl,
      ZoomControl,
      CityListControl,
      LocationControl,
      showText,
      showIcon,
      showOverlay,
    } = config.props;

    // 设置地图是否允许滚轮缩放
    if (wheelZoom) {
      map.enableScrollWheelZoom();
    } else {
      map.disableScrollWheelZoom();
    }
    // 设置地图旋转角度
    if (isNotEmpty(rotateAngle)) {
      map.setHeading(rotateAngle);
    }
    // 设置地图倾斜角度
    if (isNotEmpty(tiltAngle)) {
      map.setTilt(tiltAngle);
    }
    // 设置地图类型
    map.setMapType(window[mapType]);
    // 添加比例尺控件
    if (ScaleControl) {
      map.addControl(scaleControl);
    } else {
      map.removeControl(scaleControl);
    }
    // 添加缩放控件
    if (ZoomControl) {
      map.addControl(zoomControl);
    } else {
      map.removeControl(zoomControl);
    }
    // 添加城市列表控件
    if (CityListControl) {
      map.addControl(cityListControl);
    } else {
      map.removeControl(cityListControl);
    }
    // 添加定位控件
    if (LocationControl) {
      map.addControl(locationControl);
    } else {
      map.removeControl(locationControl);
    }
    // POI显示：文字、图标、覆盖物、3D建筑、路网
    map.setDisplayOptions({
      poiText: showText,
      poiIcon: showIcon,
      overlay: showOverlay,
    });
  }, [map, config.props]);

  // 添加marker标记
  useEffect(() => {
    if (!mapId || !map) return;
    map.clearOverlays();
    data?.forEach((item: any) => {
      const { type, lng = 116.403622, lat = 39.923153, height = 0, text = '', offset, style, options } = item;
      const point = new window.BMapGL.Point(lng, lat);
      let marker = null;
      if (type === 'marker') {
        marker = new window.BMapGL.Marker(point);
      } else if (type === 'marker3D') {
        marker = new window.BMapGL.Marker3D(point, height, style);
      } else if (type === 'label') {
        marker = new window.BMapGL.Label(text, {
          position: point,
          offset: new window.BMapGL.Size(offset?.x || 0, offset?.y || 0),
        });
        marker.setStyle(style);
      } else if (type === 'infoWindow') {
        const infoWindow = new window.BMapGL.InfoWindow(text, options);
        map.openInfoWindow(infoWindow, point);
      }

      map.addOverlay(marker);
    });
  }, [map, data]);

  useEffect(() => {
    getDataList({});
  }, [config.api, config.api?.sourceType == 'variable' ? variableData : '']);

  // 列表加载
  const getDataList = (data: any) => {
    handleApi(config.api, data).then((res) => {
      if (res?.code === 0) {
        if (!Array.isArray(res.data)) {
          console.error('[BMap]', 'data必须是一个数组对象，请检查');
          setData([]);
        } else {
          setData(res.data);
        }
      }
    });
  };

  // 对外暴露方法
  useImperativeHandle(ref, () => {
    return {
      show() {
        setVisible(true);
      },
      hide() {
        setVisible(false);
      },
      setZoom({ zoom }: { zoom: number }) {
        if (isNaN(zoom)) return;
        map?.setZoom(zoom);
      },
      getCenter() {
        return map?.getCenter();
      },
      update: (data: any) => {
        // 重新加载表格数据
        getDataList(data);
      },
    };
  });
  return visible && <div id={mapId} style={config.style}></div>;
};
export default forwardRef(MBMap);
