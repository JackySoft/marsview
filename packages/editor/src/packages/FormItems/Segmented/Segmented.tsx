import { ComponentType } from '@/packages/types';
import { Form, FormItemProps, Segmented } from 'antd';
import { forwardRef, useEffect, useImperativeHandle, useState } from 'react';
import { handleApi } from '@/packages/utils/handleApi';
import { isNull } from '@/packages/utils/util';
import { useFormContext } from '@/packages/utils/context';
import { usePageStore } from '@/stores/pageStore';

/* 泛型只需要定义组件本身用到的属性，当然也可以不定义，默认为any */
export interface IConfig {
  defaultValue: string;
  formItem: FormItemProps;
  formWrap: {
    block: boolean;
    disabled: boolean;
  };
  field: {
    label: string;
    value: string;
  };
  source: Array<{ label: string; value: any }>;
}
/**
 *
 * @param config 组件配置属性值
 * @param props 系统属性值：componentid、componentname等
 * @returns 返回组件
 */
const MSegmented = ({ id, type, config, onChange }: ComponentType<IConfig>, ref: any) => {
  const [data, setData] = useState<Array<string>>([]);
  const [visible, setVisible] = useState(true);
  const [disabled, setDisabled] = useState<boolean | undefined>();
  const { initValues } = useFormContext();
  const variableData = usePageStore((state) => state.page.pageData.variableData);

  // 初始化默认值
  useEffect(() => {
    const name: string = config.props.formItem?.name;
    const value = config.props.defaultValue;
    initValues(type, name, value);
  }, [config.props.defaultValue]);

  // 启用和禁用
  useEffect(() => {
    if (typeof config.props.formWrap.disabled === 'boolean') setDisabled(config.props.formWrap.disabled);
  }, [config.props.formWrap?.disabled]);

  useEffect(() => {
    getDataList({});
  }, [config.api, config.api?.sourceType == 'variable' ? variableData : '']);

  // 列表加载
  const getDataList = (data: any) => {
    handleApi(config.api, data).then((res) => {
      if (res?.code === 0) {
        if (!Array.isArray(res.data)) {
          console.error('[segmentd]', 'data数据格式错误，请检查');
          setData([]);
        } else {
          setData(res.data);
        }
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
      enable() {
        setDisabled(false);
      },
      disable() {
        setDisabled(true);
      },
      update: (data: any) => {
        // 重新加载表格数据
        getDataList(data);
      },
    };
  });

  const handleChange = (val: any) => {
    onChange &&
      onChange({
        [config.props.formItem.name]: val,
      });
  };

  return (
    visible && (
      <Form.Item {...config.props.formItem} data-id={id} data-type={type}>
        <Segmented<string> disabled={disabled} block={config.props.formWrap?.block} options={data} style={config.style} onChange={handleChange} />
      </Form.Item>
    )
  );
};
export default forwardRef(MSegmented);
