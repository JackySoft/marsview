import React, { useState, useImperativeHandle, forwardRef } from 'react';
import * as Icons from '@ant-design/icons';
import { ComponentType } from '@materials/types';
/**
 *
 * @param props 组件本身属性
 * @param style 组件样式
 * @returns
 */
const MIcon = (
  {
    config,
    onClick,
  }: ComponentType<{
    icon: string;
    style?: React.CSSProperties;
  }>,
  ref: any,
) => {
  const [visible, setVisible] = useState(true);
  // 对外暴露方法
  useImperativeHandle(ref, () => {
    return {
      show() {
        setVisible(true);
      },
      hide() {
        setVisible(false);
      },
    };
  });

  const handleClick = () => {
    onClick?.();
  };

  const iconsList: { [key: string]: any } = Icons;
  return (
    visible &&
    React.createElement(iconsList[config.props.icon], {
      style: config.style,
      ...config.props,
      onClick: handleClick,
    })
  );
};
export default forwardRef(MIcon);
