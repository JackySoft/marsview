import { ComponentType } from '@/packages/types';
import { isNull } from '@/packages/utils/util';
import { Form, Switch } from 'antd';
import { useEffect, useContext, useState, useImperativeHandle, forwardRef } from 'react';
import { FormContext } from '@/packages/utils/context';

/**
 *
 * @param config 组件配置属性值
 * @param props 系统属性值：componentid、componentname等
 * @returns 返回组件
 */
const MSwitch = ({ id, type, config, onChange }: ComponentType, ref: any) => {
  const form = useContext(FormContext);
  const [visible, setVisible] = useState(true);
  const [disabled, setDisabled] = useState(false);

  // 初始化默认值
  useEffect(() => {
    const name: string = config.props.formItem?.name;
    const value = config.props.defaultValue;
    // 日期组件初始化值
    if (name && !isNull(value)) {
      form?.setFieldValue(name, value);
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

  // 监听表单值变化
  const handleChange = (val: string) => {
    onChange &&
      onChange({
        [config.props.formItem.name]: val,
      });
  };
  return (
    visible && (
      <Form.Item {...config.props.formItem} data-id={id} data-type={type} valuePropName="checked">
        <Switch {...config.props.formWrap} disabled={disabled} style={config.style} onChange={handleChange} />
      </Form.Item>
    )
  );
};
export default forwardRef(MSwitch);
