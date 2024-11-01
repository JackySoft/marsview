import { ComponentType, IDragTargetItem } from '@/packages/types';
import { Button, Card } from 'antd';
import { useDrop } from 'react-dnd';
import { getComponent } from '@/packages/index';
import MarsRender from '@/packages/MarsRender/MarsRender';
import { usePageStore } from '@/stores/pageStore';
import { forwardRef, useImperativeHandle, useState } from 'react';
/**
 *
 * @param props 组件本身属性
 * @param style 组件样式
 * @returns
 */
const MCard = ({ id, type, config, elements, onClick }: ComponentType, ref: any) => {
  const addChildElements = usePageStore((state) => state.addChildElements);
  const [visible, setVisible] = useState(true);
  // 拖拽接收
  const [, drop] = useDrop({
    accept: 'MENU_ITEM',
    drop(item: IDragTargetItem, monitor) {
      if (monitor.didDrop()) return;
      // 生成默认配置
      const { config, events, methods = [] }: any = getComponent(item.type + 'Config') || {};
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

  // 点击更多事件
  const handleClick = () => {
    onClick && onClick();
  };

  return (
    visible && (
      <Card
        style={config.style}
        {...config.props}
        data-id={id}
        data-type={type}
        cover={config.props.cover ? <img src={config.props.cover} /> : null}
        extra={
          config.props.extra?.text ? (
            <Button {...config.props.extra} onClick={handleClick}>
              {config.props.extra?.text}
            </Button>
          ) : null
        }
        ref={drop}
      >
        <Card.Meta {...config.props.meta} />
        {elements?.length ? (
          <MarsRender elements={elements || []} />
        ) : (
          <div className="slots" style={{ lineHeight: '100px' }}>
            拖拽组件到这里
          </div>
        )}
      </Card>
    )
  );
};
export default forwardRef(MCard);
