import React, { forwardRef, useImperativeHandle, useMemo, useState } from 'react';
import { Badge } from 'antd';
import MarsRender from '@/packages/MarsRender/MarsRender';
import { getComponent } from '@/packages/index';
import { useDrop } from 'react-dnd';
import { usePageStore } from '@/stores/pageStore';
import { ComponentType, IDragTargetItem } from '../../types';

export type BadgeSize = 'small' | 'default';

/*泛型只需要定义组件本身用到的属性*/
interface IConfig {
  color?: string; // 自定义小圆点的颜色
  count?: React.ReactNode; // 展示的数字，大于 overflowCount 时显示为 ${overflowCount}+，为 0 时隐藏
  classNames?: Record<string, string>; // 语义化结构 class
  dot?: boolean; // 不展示数字，只有一个小红点
  offsetX?: number; // 设置状态点的位置偏移x
  offsetY?: number; // 设置状态点的位置偏移y
  offset?: [number, number]; // 设置状态点的位置偏移
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
  const { addChildElements, mode } = usePageStore((state) => ({ addChildElements: state.addChildElements, mode: state.mode }));
  //拖拽接受
  const [, drop] = useDrop({
    accept: 'MENU_ITEM',
    async drop(item: IDragTargetItem, monitor) {
      if (monitor.didDrop()) return;
      // 生成默认配置
      const { config, events, methods = [] }: any = (await getComponent(item.type + 'Config'))?.default || {};
      addChildElements({
        type: item.type,
        name: item.name,
        parentId: id,
        id: item.id,
        config,
        events,
        methods,
      });
    },
    // TODO: 拖拽组件时，容器呈现背景色（后期需要判断组件是否可以拖入）
    collect: (monitor) => ({
      isOver: monitor.isOver(),
      canDrop: monitor.canDrop(),
    }),
  });

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
      <Badge data-id={id} data-type={type} style={config.style} {...config.props} ref={drop}>
        {elements?.length ? (
          <MarsRender elements={elements || []} />
        ) : mode === 'edit' ? (
          <div className="slots" style={{ height: 100, lineHeight: '100px' }}>
            拖拽组件到这里
          </div>
        ) : null}
      </Badge>
    )
  );
};
export default forwardRef(MBadge);
