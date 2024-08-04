import { ComponentType } from '@/packages/types';
import { Typography } from 'antd';
import { useState, useImperativeHandle, forwardRef } from 'react';

/**
 *
 * @param props 组件本身属性
 * @param style 组件样式
 * @returns
 */
const MTitle = ({ id, type, config }: ComponentType, ref: any) => {
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
  return (
    visible && (
      <Typography.Title style={config.style} {...config.props} text={undefined} data-id={id} data-type={type}>
        {config.props.text}
      </Typography.Title>
    )
  );
};
export default forwardRef(MTitle);
