import { forwardRef, useImperativeHandle, useState } from 'react';
import { useDrop } from 'react-dnd';
import { getComponent } from '@/packages/index';
import { usePageStore } from '@/stores/pageStore';
import * as icons from '@ant-design/icons';
import { ComponentType, IDragTargetItem } from '@/packages/types';
import MarsRender from '@/packages/MarsRender/MarsRender';

/**
 *
 * @param props 组件本身属性
 * @param style 组件样式
 * @returns
 */
const MTabs = ({ id, type, config, elements }: ComponentType, ref: any) => {
  const [visible, setVisible] = useState(true);

  const addChildElements = usePageStore((state) => state.addChildElements);

  // 拖拽接收
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
      <div style={config.style} data-id={id} data-type={type} ref={drop}>
        {elements.length ? (
          <MarsRender elements={elements} />
        ) : (
          <div className="slots" style={{ lineHeight: '150px' }}>
            拖拽组件到这里
          </div>
        )}
      </div>
    )
  );
};
export default forwardRef(MTabs);
