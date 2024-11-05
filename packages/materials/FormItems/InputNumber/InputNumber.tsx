import { Form, FormItemProps, InputNumber, InputNumberProps } from 'antd';
import { useEffect, useState, useImperativeHandle, forwardRef } from 'react';
import { ComponentType } from '@materials/types';
import { isNull } from '@materials/utils/util';
import { useFormContext } from '@materials/utils/context';

/* 泛型只需要定义组件本身用到的属性，当然也可以不定义，默认为any */
export interface IConfig {
  defaultValue: string;
  formItem: FormItemProps;
  formWrap: InputNumberProps;
}
/**
 *
 * @param config 组件配置属性值
 * @param props 系统属性值：componentid、componentname等
 * @returns 返回组件
 */
const MInputNumber = ({ type, config, onChange }: ComponentType<IConfig>, ref: any) => {
  const { initValues } = useFormContext();
  const [visible, setVisible] = useState(true);
  const [disabled, setDisabled] = useState<boolean | undefined>();
  // 初始化默认值
  useEffect(() => {
    const name: string = config.props.formItem?.name;
    const value = config.props.defaultValue;
    initValues(type, name, value);
  }, []);

  // 启用和禁用
  useEffect(() => {
    if (typeof config.props.formWrap.disabled === 'boolean') setDisabled(config.props.formWrap.disabled);
  }, [config.props.formWrap.disabled]);

  // 对外暴露方法
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
    };
  });

  const handleChange = (val: number | string | null) => {
    onChange?.({
      [config.props.formItem.name]: val || '',
    });
  };
  return (
    visible && (
      <Form.Item {...config.props.formItem}>
        <InputNumber
          {...config.props.formWrap}
          disabled={disabled}
          variant={config.props.formWrap.variant || undefined}
          style={config.style}
          onChange={handleChange}
        />
      </Form.Item>
    )
  );
};

export default forwardRef(MInputNumber);
