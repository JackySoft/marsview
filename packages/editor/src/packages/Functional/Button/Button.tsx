import React, { forwardRef, useImperativeHandle, useState } from 'react';
import { Button } from 'antd';
import * as icons from '@ant-design/icons';
import { ComponentType } from '@/packages/types';
/*泛型只需要定义组件本身用到的属性*/
export interface IConfig {
  icon: string;
  text: string;
  authCode: string;
  authScript: string;
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
        setDisabled(false);
      },
      disable() {
        setDisabled(true);
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
  const { authCode, authScript, ...props } = config.props;
  return (
    visible && (
      <Button
        style={config.style}
        loading={loading}
        disabled={disabled}
        {...props}
        icon={props.icon ? React.createElement(iconsList[props.icon]) : null}
        data-id={id}
        data-type={type}
        onClick={handleClick}
      >
        {config.props.text}
      </Button>
    )
  );
};
export default forwardRef(MButton);
