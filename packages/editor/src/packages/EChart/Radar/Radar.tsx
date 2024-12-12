import { ComponentType } from '@/packages/types';
import { forwardRef, useEffect, useImperativeHandle, useMemo, useState } from 'react';
import { Radar } from '@ant-design/plots';
import { handleApi } from '@/packages/utils/handleApi';
import { Spin } from 'antd';
import { usePageStore } from '@/stores/pageStore';
import { handleFormatter } from '@/packages/utils/util';

/**
 *
 * @param props 组件本身属性
 * @param style 组件样式
 * @param attr 组件其它属性，比如：id、type、className
 * @returns
 */
const MRadar = ({ id, type, config }: ComponentType, ref: any) => {
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
          setData([]);
          console.error('[Radar]数据格式错误');
        }
      }
      setLoading(false);
    });
  };

  const MetaProps = useMemo(() => {
    const {
      meta: { field, alias, formatter },
    } = config.props;
    if (!field) return {};
    const meta = {
      [field]: {
        alias: alias,
        formatter: handleFormatter(formatter),
      },
    };
    return meta;
  }, [config.props]);

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
      <div data-id={id} data-type={type} style={config.style}>
        <Spin spinning={loading} size="large" wrapperClassName="spin-loading">
          <Radar {...config.props} meta={MetaProps} color={config.props.seriesField ? config.props.color : config.props.color[0]} data={data} />
        </Spin>
      </div>
    )
  );
};
export default forwardRef(MRadar);
