import { ComponentType } from '@/packages/types';
import { getDateByType, isNull } from '@/packages/utils/util';
import { Form, FormItemProps, DatePickerProps, FormInstance, TimePicker } from 'antd';
import { useEffect, useState, useImperativeHandle, forwardRef } from 'react';
import { useFormContext } from '@/packages/utils/context';

import dayjs from 'dayjs';

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
const MTimePicker = ({ id, type, config, onChange }: ComponentType<IConfig> & { form: FormInstance }, ref: any) => {
  const { initValues } = useFormContext();
  const [visible, setVisible] = useState(true);
  const [disabled, setDisabled] = useState(config.props.formWrap.disabled);
  // 初始化默认值
  useEffect(() => {
    const name: string = config.props.formItem?.name;
    const value = config.props.defaultValue;
    initValues(type, name, value);
  }, [config.props.defaultValue]);

  // 启用和禁用
  useEffect(() => {
    setDisabled(config.props.formWrap.disabled);
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
      [config.props.formItem.name]: val.format(config.props.formWrap.format || 'HH:mm:ss'),
    });
  };
  return (
    visible && (
      <Form.Item {...config.props.formItem} data-id={id} data-type={type}>
        <TimePicker
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
export default forwardRef(MTimePicker);
