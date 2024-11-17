import React, { forwardRef, useImperativeHandle, useState } from 'react';
import { Badge } from 'antd';
import MarsRender from '@materials/MarsRender/MarsRender';
import { ComponentType } from '../../types';

export type BadgeSize = 'small' | 'default';

/*泛型只需要定义组件本身用到的属性*/
interface IConfig {
  ribbon?: boolean; //是否使用缎带模式
  placement?: 'start' | 'end'; //缎带模式下，设置Badge位置
  color?: string; // 自定义小圆点的颜色
  count?: React.ReactNode; // 展示的数字，大于 overflowCount 时显示为 ${overflowCount}+，为 0 时隐藏
  classNames?: Record<string, string>; // 语义化结构 class
  dot?: boolean; // 不展示数字，只有一个小红点
  offsetX?: number; // 设置状态点的位置偏移x
  offsetY?: number; // 设置状态点的位置偏移y
  overflowCount?: number; // 展示封顶的数字值
  size?: 'small' | 'default'; // 在设置了 count 的前提下有效，设置小圆点的大小
  status?: 'success' | 'processing' | 'default' | 'error' | 'warning'; // 设置 Badge 为状态点
  styles?: Record<string, React.CSSProperties>; // 语义化结构 style
  text?: React.ReactNode; // 在设置了 status 的前提下有效，设置状态点的文本
  title?: string; // 设置鼠标放在状态点上时显示的文字
}

/**
 *
 * @param props 组件本身属性
 * @param style 组件样式
 * @returns
 */
const MBadge = ({ id, type, config, elements }: ComponentType<IConfig>, ref: any) => {
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

  const { placement, ...restProps } = config.props;

  const rewriteProps = !config.props.ribbon
    ? {
        offset: [config.props.offsetX, config.props.offsetY],
        ...restProps,
      }
    : {};

  return (
    visible && (
      <Badge style={config.style} {...rewriteProps}>
        {
          <div style={config.style} {...config.props}>
            {elements?.length ? <MarsRender elements={elements || []} /> : null}
          </div>
        }
      </Badge>
    )
  );
};
export default forwardRef(MBadge);
