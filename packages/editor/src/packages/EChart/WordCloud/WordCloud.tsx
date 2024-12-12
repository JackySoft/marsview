import { ComponentType } from '@/packages/types';
import { forwardRef, useEffect, useImperativeHandle, useState } from 'react';
import { WordCloud } from '@ant-design/plots';
import { handleApi } from '@/packages/utils/handleApi';
import { Spin } from 'antd';
import { usePageStore } from '@/stores/pageStore';

/**
 *
 * @param config 组件配置属性值
 * @param props 系统属性值：componentid、componentname等
 * @returns 返回组件
 */
const MWordCloud = ({ id, type, config }: ComponentType, ref: any) => {
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
          console.error('[Liquid]数据格式错误，只接收数字类型,eg:0.25');
        }
        setLoading(false);
      }
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
  // JSON.stringify 是为了过滤 undefined 值
  return (
    visible && (
      <div data-id={id} data-type={type} style={config.style}>
        <Spin spinning={loading} size="large" wrapperClassName="spin-loading">
          <WordCloud {...JSON.parse(JSON.stringify(config.props))} data={data} />
        </Spin>
      </div>
    )
  );
};
export default forwardRef(MWordCloud);
