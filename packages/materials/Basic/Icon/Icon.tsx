import React, { useState, useImperativeHandle, forwardRef } from 'react';
import Icon, * as Icons from '@ant-design/icons';
import { ComponentType } from '../../types';
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

  const iconComp = Icons[config.props.icon as keyof typeof Icons];
  return (
    visible && <Icon component={iconComp as React.ForwardRefExoticComponent<any>} style={config.style} {...config.props} onClick={handleClick} />
  );
};
export default forwardRef(MIcon);
