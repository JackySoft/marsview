import { ComponentType } from '@/packages/types';
import { Image } from 'antd';
import { useState, useImperativeHandle, forwardRef } from 'react';

/**
 *
 * @param props 组件本身属性
 * @param style 组件样式
 * @returns
 */
const MImage = ({ id, type, config, onClick }: ComponentType, ref: any) => {
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
  return visible && <Image style={config.style} {...config.props} data-id={id} data-type={type} onClick={handleClick} />;
};
export default forwardRef(MImage);
