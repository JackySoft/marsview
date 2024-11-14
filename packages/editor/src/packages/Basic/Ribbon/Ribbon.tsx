import React, { forwardRef, useImperativeHandle, useState } from 'react';
import { Badge } from 'antd';
import MarsRender from '@/packages/MarsRender/MarsRender';
import { getComponent } from '@/packages/index';
import { useDrop } from 'react-dnd';
import { usePageStore } from '@/stores/pageStore';
import { ComponentType, IDragTargetItem } from '../../types';

export type BadgeSize = 'small' | 'default';

/*泛型只需要定义组件本身用到的属性*/
interface IConfig {
  placement?: 'start' | 'end'; //缎带模式下，设置Badge位置
  text?: React.ReactNode; // 缎带文本
  color?: string; // 缎带颜色
  styles?: Record<string, React.CSSProperties>; // 语义化结构 style
  classNames?: Record<string, string>; // 语义化结构 class
}

const wrapperStyle: React.CSSProperties = {
  display: 'inline-block',
  width: 'fit-content',
};

/**
 *
 * @param props 组件本身属性
 * @param style 组件样式
 * @returns
 */
const MRibbon = ({ id, type, config, elements }: ComponentType<IConfig>, ref: any) => {
  const [visible, setVisible] = useState(true);
  const addChildElements = usePageStore((state) => state.addChildElements);
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
      <span data-id={id} data-type={type} ref={drop} style={{ ...wrapperStyle }}>
        <Badge.Ribbon style={config.style} {...config.props}>
          {
            <div>
              {elements?.length ? (
                <MarsRender elements={elements || []} />
              ) : (
                <div className="slots" style={{ height: 100, width: 100, lineHeight: '100px' }}>
                  拖拽组件到这里
                </div>
              )}
            </div>
          }
        </Badge.Ribbon>
      </span>
    )
  );
};
export default forwardRef(MRibbon);
