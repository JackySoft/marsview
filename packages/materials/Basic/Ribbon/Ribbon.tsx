import React, { forwardRef, useImperativeHandle, useState } from 'react';
import { Badge } from 'antd';
import MarsRender from '@materials/MarsRender/MarsRender';
import { ComponentType } from '../../types';

export type BadgeSize = 'small' | 'default';

/*泛型只需要定义组件本身用到的属性*/
interface IConfig {
  placement?: 'start' | 'end'; //缎带模式下，设置Badge位置
  text?: React.ReactNode; // 缎带文本
  color?: string; // 缎带颜色
  styles?: Record<string, React.CSSProperties>; // 语义化结构 style
  classNames?: Record<string, string>; // 语义化结构 class
}

/**
 *
 * @param props 组件本身属性
 * @param style 组件样式
 * @returns
 */
const MRibbon = ({ id, type, config, elements }: ComponentType<IConfig>, ref: any) => {
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
      <span className="ant-badge">
        <Badge.Ribbon style={config.style} {...config.props}>
          {
            <div style={config.style} {...config.props}>
              {elements?.length ? <MarsRender elements={elements || []} /> : null}
            </div>
          }
        </Badge.Ribbon>
      </span>
    )
  );
};
export default forwardRef(MRibbon);
