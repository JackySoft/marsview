import { ComponentType } from '@/packages/types';
import { Form, FormItemProps, RadioProps, Checkbox } from 'antd';
import { forwardRef, useEffect, useImperativeHandle, useState } from 'react';
import { handleApi } from '@/packages/utils/handleApi';
import { isNotEmpty, isNull } from '@/packages/utils/util';
import { useFormContext } from '@/packages/utils/context';
import { usePageStore } from '@/stores/pageStore';

/* 泛型只需要定义组件本身用到的属性，当然也可以不定义，默认为any */
export interface IConfig {
  defaultValue: string;
  formItem: FormItemProps;
  formWrap: RadioProps;
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
const MCheckBox = ({ id, type, config, onChange }: ComponentType<IConfig>, ref: any) => {
  const [data, setData] = useState<Array<{ label: string; value: any }>>([]);
  const [visible, setVisible] = useState(true);
  const [disabled, setDisabled] = useState<boolean | undefined>();
  const { initValues } = useFormContext();
  const variableData = usePageStore((state) => state.page.pageData.variableData);

  /**
   * 初始化默认值
   * 此处需要注意：默认值可能是一个数组，必须比对字符串，否则会出现死循环
   */
  useEffect(() => {
    const name: string = config.props.formItem?.name;
    const value = config.props.defaultValue || [];
    initValues(type, name, value);
  }, [JSON.stringify(config.props.defaultValue)]);

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
          console.error('[checkbox]', 'data数据格式错误，请检查');
          setData([]);
        } else {
          // 判断是否需要做数据转换
          let options = [];
          if (config.props.field.label === 'label' && config.props.field.value === 'value') {
            options = res.data;
            if (typeof res.data[0] === 'string' || typeof res.data[0] === 'number') {
              options = res.data.map((item: string | number) => {
                return { label: item, value: item };
              });
            }
          } else {
            options = res.data.map((item: any) => {
              const label = item[config.props.field.label || 'label'];
              const value = item[config.props.field.value || 'value'];
              return {
                label: isNotEmpty(label) ? label : '-',
                value: isNotEmpty(value) ? value : '',
              };
            });
          }
          setData(options);
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
    onChange?.({
      [config.props.formItem.name]: val,
    });
  };

  return (
    visible && (
      <Form.Item {...config.props.formItem} data-id={id} data-type={type}>
        <Checkbox.Group
          {...config.props.formWrap}
          disabled={disabled}
          options={data}
          style={config.style}
          onChange={(checkedValues) => handleChange(checkedValues)}
        />
      </Form.Item>
    )
  );
};
export default forwardRef(MCheckBox);
