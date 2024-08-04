import { ComponentType } from '../../types';
import { getDateByType, isNull } from '../../utils/util';
import { Form, DatePicker, FormItemProps, DatePickerProps, FormInstance } from 'antd';
import { useEffect, useContext, useState, useImperativeHandle, forwardRef } from 'react';
import { FormContext } from '../../utils/context';

export interface IConfig {
  defaultValue: string;
  formItem: FormItemProps;
  formWrap: DatePickerProps;
}
/**
 *
 * @param config 组件配置属性值
 * @param props 系统属性值：componentid、componentname等
 * @returns 返回组件
 */
const MDatePicker = ({ config, onChange }: ComponentType<IConfig> & { form: FormInstance }, ref: any) => {
  const form = useContext(FormContext);
  const [visible, setVisible] = useState(true);
  const [disabled, setDisabled] = useState(false);
  // 初始化默认值
  useEffect(() => {
    const name: string = config.props.formItem?.name;
    const value = config.props.defaultValue;
    // 日期组件初始化值
    if (name && !isNull(value)) {
      const date = getDateByType(value);
      form?.setFieldValue(name, date);
    }
  }, [config.props.defaultValue]);

  // 启用和禁用
  useEffect(() => {
    setDisabled(config.props.formWrap.disabled || false);
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

  const handleChange = (val: any) => {
    onChange?.({
      [config.props.formItem.name]: val.format(config.props.formWrap.format),
    });
  };
  return (
    visible && (
      <Form.Item {...config.props.formItem}>
        <DatePicker
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
export default forwardRef(MDatePicker);
