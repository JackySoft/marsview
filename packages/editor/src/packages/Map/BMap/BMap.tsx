import { ComponentType } from '@/packages/types';
import { createId, isNotEmpty } from '@/packages/utils/util';
import { useState, useImperativeHandle, forwardRef, useEffect } from 'react';

/**
 *
 * @param props 组件本身属性
 * @param style 组件样式
 * @returns
 */
const MBMap = ({ id, type, config, onLoaded, onClick }: ComponentType, ref: any) => {
  const [visible, setVisible] = useState(true);
  const [mapId, setMapId] = useState('');
  const [map, setMap] = useState<any>(null);
  useEffect(() => {
    setMapId(createId('BMap'));
  }, []);

  useEffect(() => {
    if (!mapId) return;
    const map = new window.BMapGL.Map(mapId);
    const point = new window.BMapGL.Point(116.404, 39.915);
    map.centerAndZoom(point, config.props.zoom || 15);
    map.addEventListener('tilesloaded', function () {
      onLoaded?.();
    });
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
    const { cityName, zoom, wheelZoom, rotateAngle, tiltAngle, mapType, ScaleControl, ZoomControl, CityListControl, LocationControl } = config.props;
    // 设置当前城市
    if (cityName.trim()) {
      const [lat, lng] = cityName.split(',');
      if (lat && lng) {
        map.centerAndZoom(new window.BMapGL.Point(lat, lng), zoom || 15);
      } else {
        map.centerAndZoom(cityName, zoom || 15);
      }
    }
    // 设置地图是否允许滚轮缩放
    map.enableScrollWheelZoom(wheelZoom);
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
      map.addControl(new window.BMapGL.ScaleControl());
    }
    // 添加缩放控件
    if (ZoomControl) {
      map.addControl(new window.BMapGL.ZoomControl());
    }
    // 添加城市列表控件
    if (CityListControl) {
      map.addControl(new window.BMapGL.CityListControl());
    }
    // 添加定位控件
    if (LocationControl) {
      map.addControl(new window.BMapGL.LocationControl());
    }
  }, [map, config.props]);

  // 对外暴露方法
  useImperativeHandle(ref, () => {
    return {
      show() {
        setVisible(true);
      },
      hide() {
        setVisible(false);
      },
    };
  });
  return visible && <div id={mapId} style={config.style} data-id={id} data-type={type}></div>;
};
export default forwardRef(MBMap);
