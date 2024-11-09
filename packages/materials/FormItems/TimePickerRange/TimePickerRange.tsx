import { ComponentType } from '@materials/types';
import { isNotEmpty } from '@materials/utils/util';
import { Form, FormItemProps, FormInstance, TimePicker } from 'antd';
import { useEffect, useState, useImperativeHandle, forwardRef } from 'react';
import { useFormContext } from '@materials/utils/context';

import dayjs from 'dayjs';

export interface IConfig {
  defaultValue: string;
  startField: string;
  endField: string;
  formItem: FormItemProps;
  formWrap: any;
}
/**
 *
 * @param config 组件配置属性值
 * @param props 系统属性值：componentid、componentname等
 * @returns 返回组件
 */
const MTimePickerRange = ({ type, config, onChange }: ComponentType<IConfig> & { form: FormInstance }, ref: any) => {
  const { initValues } = useFormContext();
  const [visible, setVisible] = useState(true);
  const [disabled, setDisabled] = useState(config.props.formWrap.disabled);
  // 初始化默认值
  useEffect(() => {
    const name: string = config.props.formItem?.name;
    const value = config.props.defaultValue;
    // 日期组件初始化值
    if (name && isNotEmpty(value)) {
      const fmt = config.props.formWrap.format || 'HH:mm:ss';
      const rangeTime = value.split(',').map((item) => dayjs(item, fmt));
      initValues(type, name, rangeTime);
    }
  }, []);

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

  const handleChange = (times: any) => {
    const obj: any = {};
    const {
      startField,
      endField,
      formItem: { name },
      formWrap: { format },
    } = config.props;
    const [start, end] = times.map((date: any) => date?.format(format));
    if (startField && endField) {
      obj[startField] = start;
      obj[endField] = end;
      delete obj[name];
    } else {
      obj[name] = [start, end];
    }
    onChange?.(obj);
  };
  return (
    visible && (
      <Form.Item {...config.props.formItem}>
        <TimePicker.RangePicker
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
export default forwardRef(MTimePickerRange);
