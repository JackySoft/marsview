import React, { useState, useImperativeHandle, forwardRef, useMemo } from 'react';
import { Tag } from 'antd';
import { ComponentType } from '@/packages/types';
import { omit } from 'lodash-es';
import * as icons from '@ant-design/icons';

/**
 *
 * @param props 组件本身属性
 * @param style 组件样式
 * @returns
 */
const MTag = ({ id, type, config, onClose }: ComponentType, ref: any) => {
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
    onClose?.();
  };
  const iconsList: { [key: string]: any } = icons;
  const color = useMemo(() => {
    return config.props?.status || config.props?.color || undefined;
  }, [config.props?.status, config.props?.color]);
  return (
    visible && (
      <Tag
        style={config.style}
        {...omit(config.props, ['status', 'text'])}
        color={color}
        icon={config.props.icon ? React.createElement(iconsList[config.props.icon]) : null}
        onClose={handleClick}
        data-id={id}
        data-type={type}
      >
        {config.props.text}
      </Tag>
    )
  );
};
export default forwardRef(MTag);
