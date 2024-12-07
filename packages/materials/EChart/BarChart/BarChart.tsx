import { ComponentType } from '@materials/types';
import { forwardRef, useEffect, useImperativeHandle, useState } from 'react';
import { Bar } from '@ant-design/plots';
import { handleApi } from '@materials/utils/handleApi';
import { Spin } from 'antd';
import { usePageStore } from '@materials/stores/pageStore';
/**
 *
 * @param props 组件本身属性
 * @param style 组件样式
 * @param attr 组件其它属性，比如：id、type、className
 * @returns
 */
const EChart = ({ config }: ComponentType, ref: any) => {
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [visible, setVisible] = useState(true);
  const variableData = usePageStore((state) => state.page.pageData.variableData);
  useEffect(() => {
    getDataList({});
  }, [config.api, config.api?.sourceType == 'variable' ? variableData : '']);
  const getDataList = (data: any) => {
    setLoading(true);
    handleApi(config.api, data).then((res) => {
      if (res?.code === 0) {
        if (Array.isArray(res.data)) {
          setData(res.data);
        } else {
          console.error('[BarChart]', 'data数据格式错误，请检查');
          setData([]);
        }
      }
      setLoading(false);
    });
  };
  useImperativeHandle(ref, () => {
    return {
      show() {
        setVisible(true);
      },
      hide() {
        setVisible(false);
      },
      update: (data: any) => {
        // 重新加载表格数据
        getDataList(data);
      },
    };
  });
  return (
    visible && (
      <div style={config.style}>
        <Spin spinning={loading} size="large" wrapperClassName="spin-loading">
          <Bar {...config.props} color={config.props.seriesField ? config.props.color : config.props.color[0]} data={data} />
        </Spin>
      </div>
    )
  );
};
export default forwardRef(EChart);
