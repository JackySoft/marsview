import { useState } from 'react';
import { DragSourceMonitor, useDrag } from 'react-dnd';
import { IDragTarget } from '@/packages/types/index';
import { checkComponentType, createId } from '@/utils/util';
import { getComponent } from '@/packages/index';
import { usePageStore } from '@/stores/pageStore';
import { message } from '@/utils/AntdGlobal';
import { Button } from 'antd';
import styles from './index.module.less';
/**
 * 拖拽目标
 * @param props 拖拽对象属性值
 * @returns 返回可拖拽组件对象
 */
const DragMenuItem = (props: IDragTarget) => {
  // 生成组件ID
  const [id, setId] = useState(createId(props.type));
  const { selectedElement, elementsMap, addElement, addChildElements } = usePageStore((state) => {
    return {
      addElement: state.addElement,
      addChildElements: state.addChildElements,
      selectedElement: state.selectedElement,
      elementsMap: state.page.pageData.elementsMap,
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

  const handleClick = async (item: IDragTarget) => {
    // 生成默认配置
    const { config, events, methods = [], elements = [] } = (await getComponent(item.type + 'Config'))?.default || {};
    const newId = createId(item.type);
    if (!checkComponentType(item.type, selectedElement?.id, selectedElement?.type, elementsMap)) {
      message.info('请把表单项放在Form容器内');
      return;
    }
    const childElement =
      elements.map(async (child: IDragTarget & { id: string }) => {
        const { config, events, methods = [] }: any = (await getComponent(child.type + 'Config'))?.default || {};
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
    Promise.all(childElement).then((res) => {
      if (selectedElement) {
        addChildElements({
          type: item.type,
          name: item.name,
          elements: res,
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
          elements: res,
          config,
          events,
          methods,
        });
      }
    });
  };

  return (
    <div className={styles.itemContainer} ref={drag} onClick={() => handleClick(props)} style={{ cursor: 'pointer' }}>
      <div className={styles.iconContainer}>{typeof props.icon === 'string' ? <img src={props.icon} alt={props.name} /> : props.icon}</div>
      <div className={styles.itemName}>{props.name}</div>
    </div>
  );
};

export default DragMenuItem;
