import { ComponentType } from '@materials/types';
import { isNull } from '@materials/utils/util';
import { Form, Switch } from 'antd';
import { useEffect, useState, useImperativeHandle, forwardRef } from 'react';
import { useFormContext } from '@materials/utils/context';

/**
 *
 * @param config 组件配置属性值
 * @param props 系统属性值：componentid、componentname等
 * @returns 返回组件
 */
const MSwitch = ({ type, config, onChange }: ComponentType, ref: any) => {
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
    onChange?.({
      [config.props.formItem.name]: val,
    });
  };
  return (
    visible && (
      <Form.Item {...config.props.formItem} valuePropName="checked">
        <Switch {...config.props.formWrap} disabled={disabled} style={config.style} onChange={handleChange} />
      </Form.Item>
    )
  );
};
export default forwardRef(MSwitch);
