import React, { forwardRef, useImperativeHandle, useState } from 'react';
import * as icons from '@ant-design/icons';
import AuthButton from './AuthButton';
import { ComponentType } from '@materials/types';
/*泛型只需要定义组件本身用到的属性*/
export interface IConfig {
  icon: string;
  text: string;
}
/**
 *
 * @param props 组件本身属性
 * @param style 组件样式
 * @returns
 */
const MButton = ({ id, type, config, onClick }: ComponentType<IConfig>, ref: any) => {
  const [visible, setVisible] = useState(true);
  const [disabled, setDisabled] = useState<boolean | undefined>();
  const [loading, setLoading] = useState(false);
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
        setDisabled(true);
      },
      disable() {
        setDisabled(false);
      },
      startLoading: () => {
        setLoading(true);
      },
      hideLoading: () => {
        setLoading(false);
      },
    };
  });
  const handleClick = () => {
    onClick?.();
  };
  const iconsList: { [key: string]: any } = icons;
  return (
    visible && (
      <AuthButton
        style={config.style}
        loading={loading}
        disabled={disabled}
        {...config.props}
        icon={config.props.icon ? React.createElement(iconsList[config.props.icon]) : null}
        onClick={handleClick}
      >
        {config.props.text}
      </AuthButton>
    )
  );
};
export default forwardRef(MButton);
