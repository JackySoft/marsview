import React, { forwardRef, useImperativeHandle, useState } from 'react';
import { Avatar } from 'antd';
import { ComponentType } from '../../types';

export type AvatarSize = 'large' | 'small' | 'default' | number;

/*泛型只需要定义组件本身用到的属性*/
export interface IConfig {
  textavatar?: string; // 文字头像
  /** Shape of avatar, options: `circle`, `square` */
  shape?: 'circle' | 'square';
  size?: AvatarSize;
  gap?: number;
  /** Src of image avatar */
  src?: React.ReactNode;
  /** Srcset of image avatar */
  srcSet?: string;
  draggable?: boolean | 'true' | 'false';
  /** Icon to be used in avatar */
  icon?: React.ReactNode;
  children?: React.ReactNode;
  alt?: string;
  crossOrigin?: '' | 'anonymous' | 'use-credentials';
}
/**
 *
 * @param props 组件本身属性
 * @param style 组件样式
 * @returns
 */
const MAvatar = ({ config }: ComponentType<IConfig>, ref: any) => {
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
      <Avatar style={config.style} {...config.props} size={!isNaN(Number(config.props?.size)) ? Number(config.props?.size) : config.props?.size}>
        {config.props.textavatar}
      </Avatar>
    )
  );
};
export default forwardRef(MAvatar);
