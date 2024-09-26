import { Form, Input, FormItemProps } from 'antd';
import { useEffect, useState, useImperativeHandle, forwardRef } from 'react';
import { ComponentType } from '@/packages/types';
import { isNull } from '@/packages/utils/util';
import { useFormContext } from '@/packages/utils/context';

/* 泛型只需要定义组件本身用到的属性，当然也可以不定义，默认为any */
export interface IConfig {
  defaultValue: string;
  formItem: FormItemProps;
  formWrap: any;
}
/**
 *
 * @param config 组件配置属性值
 * @param props 系统属性值：componentid、componentname等
 * @returns 返回组件
 */
const MTextArea = ({ id, type, config, onChange }: ComponentType<IConfig>, ref: any) => {
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

  const handleChange = (val: string) => {
    onChange &&
      onChange({
        [config.props.formItem.name]: val,
      });
  };
  return (
    visible && (
      <Form.Item {...config.props.formItem} data-id={id} data-type={type}>
        <Input.TextArea
          {...config.props.formWrap}
          disabled={disabled}
          variant={config.props.formWrap.variant || undefined}
          style={config.style}
          onChange={(event) => handleChange(event.target.value)}
        />
      </Form.Item>
    )
  );
};

export default forwardRef(MTextArea);
