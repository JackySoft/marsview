import { ComponentType } from '@/packages/types';
import { Steps } from 'antd';
import { forwardRef, useEffect, useImperativeHandle, useState } from 'react';
import { handleApi } from '../../utils/handleApi';
import { usePageStore } from '@/stores/pageStore';

/*泛型只需要定义组件本身用到的属性*/
export interface IConfig {
  current: number;
  direction: 'horizontal' | 'vertical';
  labelPlacement: 'horizontal' | 'vertical';
  responsive: boolean;
}
/**
 *
 * @param props 组件本身属性
 * @param style 组件样式
 * @returns
 */
const MSteps = ({ id, type, config, onChange }: ComponentType<IConfig>, ref: any) => {
  const [visible, setVisible] = useState(true);
  const [current, setCurrent] = useState(config.props.current || 0);
  const [data, setData] = useState<Array<{ title: string; description: string; subTitle: string }>>([]);
  const variableData = usePageStore((state) => state.page.pageData.variableData);
  useEffect(() => {
    setCurrent(config.props.current);
  }, [config.props.current]);
  useEffect(() => {
    getDataList({});
  }, [config.api, config.api?.sourceType == 'variable' ? variableData : '']);
  // 列表加载
  const getDataList = (data: any) => {
    handleApi(config.api, data).then((res) => {
      if (res?.code === 0) {
        if (!Array.isArray(res.data)) {
          console.error('[Steps]', 'data数据格式错误，请检查');
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
      update() {
        getDataList(data);
      },
      updateStep(val: number) {
        setCurrent(val);
      },
    };
  });
  const handleChange = (current: number) => {
    setCurrent(current);
    onChange?.({ current });
  };
  return (
    visible && (
      <Steps style={config.style} {...config.props} current={current} items={data} onChange={handleChange} data-id={id} data-type={type}></Steps>
    )
  );
};
export default forwardRef(MSteps);
