import { ComponentType } from '@materials/types';
import { getDateRangeByType, isNull } from '@materials/utils/util';
import { Form, DatePicker, FormItemProps } from 'antd';
import { useEffect, useState, useImperativeHandle, forwardRef } from 'react';
import { useFormContext } from '@materials/utils/context';

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
const MDatePickerRange = ({ type, config, onChange }: ComponentType<IConfig>, ref: any) => {
  const { RangePicker } = DatePicker;
  const { initValues } = useFormContext();
  const [visible, setVisible] = useState(true);
  const [disabled, setDisabled] = useState<boolean | undefined>();
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

  const handleChange = (dates: any) => {
    const obj: any = {};
    const {
      startField,
      endField,
      formItem: { name },
      formWrap: { format },
    } = config.props;
    const [start, end] = dates?.map((date: any) => date?.format(format)) || [undefined, undefined];
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
        <RangePicker
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
export default forwardRef(MDatePickerRange);
