import { useState } from 'react';
import { DragSourceMonitor, useDrag } from 'react-dnd';
import { IDragTarget } from '@/packages/types/index';
import { checkComponentType, createId } from '@/utils/util';
import * as Components from '@/packages/index';
import { usePageStore } from '@/stores/pageStore';
import styles from './index.module.less';
import { message } from '@/utils/AntdGlobal';
/**
 * 拖拽目标
 * @param props 拖拽对象属性值
 * @returns 返回可拖拽组件对象
 */
const DragMenuItem = (props: IDragTarget) => {
  // 生成组件ID
  const [id, setId] = useState(createId(props.type));
  const { selectedElement, addElement, addChildElements } = usePageStore((state) => {
    return {
      addElement: state.addElement,
      addChildElements: state.addChildElements,
      selectedElement: state.selectedElement,
    };
  });
  const [{ isDragging }, drag] = useDrag(
    () => ({
      type: 'MENU_ITEM',
      item: {
        id,
        type: props.type,
        name: props.name,
      },
      end: () => {
        setId(createId(props.type));
      },
      collect: (monitor: DragSourceMonitor) => {
        return {
          isDragging: monitor.isDragging(),
        };
      },
    }),
    [id],
  );

  const handleClick = (item: IDragTarget) => {
    // 生成默认配置
    const { config, events, methods = [], elements = [] }: any = Components[(item.type + 'Config') as keyof typeof Components] || {};
    const newId = createId(item.type);
    if (!checkComponentType(item.type, selectedElement?.type)) {
      message.warning(`${item.name}组件不支持添加到${selectedElement?.type || '页面'}中`);
      return;
    }
    const childElement =
      elements.map((child: IDragTarget & { id: string }) => {
        const { config, events, methods = [] }: any = Components[(child.type + 'Config') as keyof typeof Components] || {};
        return {
          id: child.id || createId(child.type),
          name: child.name,
          type: child.type,
          parentId: newId,
          config,
          events,
          methods,
        };
      }) || [];
    if (selectedElement) {
      addChildElements({
        type: item.type,
        name: item.name,
        elements: childElement,
        parentId: selectedElement.id,
        id: newId,
        config,
        events,
        methods,
      });
    } else {
      addElement({
        type: item.type,
        name: item.name,
        id: newId,
        elements: childElement,
        config,
        events,
        methods,
      });
    }
  };

  // 拖拽样式
  const style = {
    color: '#7d33ff',
    borderColor: '#7d33ff',
  };
  return (
    <div className={styles.menuItem} style={isDragging ? style : {}} ref={drag} onClick={() => handleClick(props)}>
      {props.name}
    </div>
  );
};

export default DragMenuItem;
