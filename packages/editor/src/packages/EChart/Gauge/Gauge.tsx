import { ComponentType } from '@/packages/types';
import { forwardRef, useEffect, useImperativeHandle, useMemo, useState } from 'react';
import { Gauge } from '@ant-design/plots';
import { handleApi } from '@/packages/utils/handleApi';
import { Spin } from 'antd';
import { usePageStore } from '@/stores/pageStore';
import { cloneDeep } from 'lodash-es';
import { handleFormatter } from '@/packages/utils/util';

/**
 *
 * @param config 组件配置属性值
 * @param props 系统属性值：componentid、componentname等
 * @returns 返回组件
 */
const MGauge = ({ id, type, config }: ComponentType, ref: any) => {
  const [data, setData] = useState<string | number>(0);
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
        if (!isNaN(res.data)) {
          setData(res.data);
        } else {
          console.error('[Liquid]数据格式错误，只接收数字类型,eg:0.25');
        }
        setLoading(false);
      }
    });
  };
  const GaugeProps = useMemo(() => {
    const props = cloneDeep(config.props);
    const script1 = props.axis.label.formatter;
    const script2 = props.statistic.content.formatter;
    props.axis.label.formatter = handleFormatter(script1);
    props.statistic.content.formatter = handleFormatter(script2);
    const ticks = props.range.ticks;
    try {
      if (typeof ticks === 'string') {
        props.range.ticks = ticks?.split(',') || [];
      }
    } catch (error) {
      console.error(`脚本解析失败`, error);
    }

    return props;
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
  // JSON.stringify 是为了过滤 undefined
  return (
    visible && (
      <div data-id={id} data-type={type} style={config.style}>
        <Spin spinning={loading} size="large" wrapperClassName="spin-loading">
          <Gauge {...GaugeProps} percent={data} />
        </Spin>
      </div>
    )
  );
};
export default forwardRef(MGauge);
