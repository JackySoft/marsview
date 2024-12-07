import { ComponentType } from '@/packages/types';
import { Form, FormItemProps, SelectProps, TreeSelect } from 'antd';
import { forwardRef, memo, useEffect, useImperativeHandle, useState } from 'react';
import { handleApi } from '@/packages/utils/handleApi';
import { useFormContext } from '@/packages/utils/context';
import { usePageStore } from '@/stores/pageStore';
import { useShallow } from 'zustand/react/shallow';

/* 泛型只需要定义组件本身用到的属性，当然也可以不定义，默认为any */
export interface IConfig {
  defaultValue: string;
  formItem: FormItemProps;
  formWrap: SelectProps;
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
const MTreeSelect = ({ id, type, config, onChange }: ComponentType<IConfig>, ref: any) => {
  const { initValues } = useFormContext();
  const [data, setData] = useState<Array<{ label: string; value: any }>>([]);
  const [visible, setVisible] = useState(true);
  const [disabled, setDisabled] = useState<boolean | undefined>();
  const variableData = usePageStore(useShallow((state) => state.page.pageData.variableData));
  // 初始化默认值
  useEffect(() => {
    const name: string = config.props.formItem?.name;
    const value = config.props.defaultValue;
    initValues(type, name, value);
  }, [config.props.defaultValue]);

  // 启用和禁用
  useEffect(() => {
    if (typeof config.props.formWrap.disabled === 'boolean') setDisabled(config.props.formWrap.disabled);
  }, [config.props.formWrap.disabled]);

  useEffect(() => {
    getDataList({});
  }, [config.api, config.api?.sourceType == 'variable' ? variableData : '']);

  // 列表加载
  const getDataList = (data: any) => {
    handleApi(config.api, data).then((res) => {
      if (res?.code === 0) {
        if (!Array.isArray(res.data)) {
          console.error('[TreeSelect]', 'data数据格式错误，请检查');
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
        <TreeSelect
          {...config.props.formWrap}
          disabled={disabled}
          variant={config.props.formWrap.variant || undefined}
          treeData={data}
          style={config.style}
          onChange={(val) => handleChange(val)}
        />
      </Form.Item>
    )
  );
};
export default memo(forwardRef(MTreeSelect));
