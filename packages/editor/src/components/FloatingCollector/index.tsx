import React, { useCallback, useEffect, useState } from 'react';
import styles from './index.module.less';
import { Badge, Button, Tooltip } from 'antd';
import { DeleteOutlined } from '@ant-design/icons';
import { usePageStore } from '@/stores/pageStore';
import { getComponentRef } from '@/packages/utils/useComponentRefs';

type CollectorItem = {
  id: string;
  name: string;
};
const FloatingCollector = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [selectedItem, setSelectedItem] = useState<string | null>(null);
  const [modalList, setModalList] = useState<CollectorItem[]>([]);
  const [drawerList, setDrawerList] = useState<CollectorItem[]>([]);
  const [currentItems, setCurrentItems] = useState<CollectorItem[]>([]);
  const [currentType, setCurrentType] = useState<number>(1);

  const { elementsMap, removeElements } = usePageStore((state) => {
    return {
      elementsMap: state.page.pageData.elementsMap,
      removeElements: state.removeElements,
    };
  });

  // 过滤弹框和抽屉组件
  useEffect(() => {
    setModalList([]);
    setDrawerList([]);
    Object.keys(elementsMap)
      .filter((id) => id.startsWith('Modal') || id.startsWith('Drawer'))
      ?.forEach((id: string) => {
        if (id.startsWith('Modal')) {
          setModalList((prevList) => [...prevList, { id, name: `Modal(${id})` }]);
        } else {
          setDrawerList((prevList) => [...prevList, { id, name: `Drawer(${id})` }]);
        }
      });
  }, [elementsMap]);

  // 更新当前显示的列表
  useEffect(() => {
    setCurrentItems(currentType === 1 ? modalList : drawerList);
    setIsExpanded(isExpanded && currentType === 1 ? modalList.length > 0 : drawerList.length > 0);
  }, [currentType, modalList, drawerList]);

  // 切换类型
  const handleTypeClick = (type: number) => {
    setCurrentType(type);
    setIsExpanded(!isExpanded);
  };

  // 打开弹框或抽屉
  const handleItemClick = useCallback((item: CollectorItem, type: string) => {
    setSelectedItem(item.id);
    if (type === 'double') {
      setIsExpanded(false);
      const ref = getComponentRef(item.id);
      ref.open({});
    }
  }, []);

  // 删除弹框或抽屉
  const handleDelete = useCallback((targetId: string) => {
    setSelectedItem(null);
    removeElements(targetId);
  }, []);

  return (
    <div className={styles.container}>
      {/* 展开内容区域 */}
      {isExpanded && (
        <div className={`${styles.collectorContent} ${styles.expanded}`}>
          <div className={styles.itemList}>
            {currentItems.map((item) => (
              <Tooltip title="单击选中，双击打开" placement="top" key={item.id}>
                <Button
                  onClick={() => handleItemClick(item, 'single')}
                  onDoubleClick={() => handleItemClick(item, 'double')}
                  className={`${styles.item} ${selectedItem === item.id ? styles.active : ''}`}
                >
                  <span className={styles.title}>{item.name}</span>
                  <span className={styles.action}>
                    <DeleteOutlined
                      style={{ marginLeft: '5px' }}
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDelete(item.id);
                      }}
                    />
                  </span>
                </Button>
              </Tooltip>
            ))}
          </div>
        </div>
      )}

      <div className={`${styles.iconContainer} ${isExpanded ? styles.expanded : ''}`}>
        <Button disabled={modalList.length === 0} className={styles.iconButton} onClick={() => handleTypeClick(1)}>
          <Badge count={modalList.length} size="small" color="#7d3fff" showZero>
            <ModalIcon />
          </Badge>
          <span style={{ marginLeft: '5px' }}>弹窗</span>
        </Button>
        <Button disabled={drawerList.length === 0} className={styles.iconButton} onClick={() => handleTypeClick(2)}>
          <Badge count={drawerList.length} size="small" color="#7d3fff" showZero>
            <DrawerIcon />
          </Badge>
          <span style={{ marginLeft: '5px' }}>抽屉</span>
        </Button>
      </div>
    </div>
  );
};

const ModalIcon: React.FC = () => (
  <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M4 4h16a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    <path d="M9 4v16M15 4v16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeDasharray="2 4" />
  </svg>
);

const DrawerIcon: React.FC = () => (
  <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M3 3h18a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2z" stroke="currentColor" strokeWidth="2" />
    <path d="M15 3v18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
  </svg>
);

export default FloatingCollector;
