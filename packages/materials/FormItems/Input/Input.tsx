import React, { forwardRef, useEffect, useImperativeHandle, useState } from 'react';
import { Form, Input, InputProps, FormItemProps } from 'antd';
import * as icons from '@ant-design/icons';
import { ComponentType } from '../../types';
import { isNull } from '../../utils/util';
import { useFormContext } from '../../utils/context';
import omit from 'lodash-es/omit';

/* 泛型只需要定义组件本身用到的属性，当然也可以不定义，默认为any */
export interface IConfig {
  defaultValue: string;
  formItem: FormItemProps;
  formWrap: InputProps & { prefixIcons?: string; suffixIcons?: string };
}
/**
 *
 * @param config 组件配置属性值
 * @param props 系统属性值：componentid、componentname等
 * @returns 返回组件
 */
const MInput = ({ config, onChange, onBlur, onPressEnter }: ComponentType<IConfig>, ref: any) => {
  const { form, formId, setFormData } = useFormContext();
  const [visible, setVisible] = useState(true);
  const [disabled, setDisabled] = useState(false);
  // 初始化默认值
  useEffect(() => {
    const name: string = config.props.formItem?.name;
    const value = config.props.defaultValue;
    // 日期组件初始化值
    if (name && !isNull(value)) {
      form?.setFieldValue(name, value);
      setFormData({ name: formId, value: { [name]: value } });
    }
  }, [config.props.defaultValue]);

  // 启用和禁用
  useEffect(() => {
    setDisabled(config.props.formWrap.disabled || false);
  }, [config.props.formWrap.disabled]);

  // 输入事件
  const handleChange = (val: string) => {
    onChange &&
      onChange({
        [config.props.formItem.name]: val,
      });
  };

  // 失去焦点事件
  const handleBlur = (val: string) => {
    onBlur?.({
      [config.props.formItem.name]: val,
    });
  };

  // 回车事件
  const handlePressEnter = (val: string) => {
    onPressEnter?.({
      [config.props.formItem.name]: val,
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
    };
  });
  const iconsList: { [key: string]: any } = icons;
  return (
    visible && (
      <Form.Item {...config.props.formItem}>
        <Input
          {...omit(config.props.formWrap, ['prefixIcons', 'suffixIcons'])}
          disabled={disabled}
          variant={config.props.formWrap.variant || undefined}
          style={config.style}
          prefix={config.props.formWrap.prefixIcons ? React.createElement(iconsList[config.props.formWrap.prefixIcons]) : null}
          suffix={config.props.formWrap.suffixIcons ? React.createElement(iconsList[config.props.formWrap.suffixIcons]) : null}
          onChange={(event) => handleChange(event.target.value)}
          onBlur={(event) => handleBlur(event.target.value)}
          onPressEnter={(event: any) => handlePressEnter(event.target.value)}
        />
      </Form.Item>
    )
  );
};

export default forwardRef(MInput);
