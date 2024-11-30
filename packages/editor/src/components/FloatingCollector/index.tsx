import React, { useCallback, useEffect, useRef, useState } from 'react';
import styles from './index.module.less';
import { Badge, Button, Popconfirm, Tooltip } from 'antd';
import { CloseCircleFilled, CloseCircleOutlined, DeleteOutlined, QuestionCircleFilled } from '@ant-design/icons';
import { CollectorItem } from '@/packages/types';

interface FloatingCollectorProps {
  modalList: CollectorItem[];
  drawerList: CollectorItem[];
  clickItem: (item: CollectorItem) => void;
  closeItem: (item: CollectorItem) => void;
  deleteItem: (targetId: string) => void;
}

const FloatingCollector = (props: FloatingCollectorProps) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [selectedItem, setSelectedItem] = useState<string | null>(null);
  const [currentItems, setCurrentItems] = useState<CollectorItem[]>([]);
  const [currentType, setCurrentType] = useState<number>(1);
  const { modalList, drawerList } = props;

  useEffect(() => {
    if (currentType === 1) {
      setCurrentItems(modalList);
    }
    if (currentType === 2) {
      setCurrentItems(drawerList);
    }
    if (modalList.length === 0 && drawerList.length === 0) {
      setIsExpanded(false);
    } else if (modalList.length > 0 && drawerList.length === 0) {
      setCurrentItems(modalList);
      setCurrentType(1);
    } else if (modalList.length === 0 && drawerList.length > 0) {
      setCurrentItems(drawerList);
      setCurrentType(2);
    }
  }, [modalList, drawerList]);

  const handleTypeClick = useCallback(
    (type: number) => {
      setCurrentType(type);
      if (isExpanded && currentItems === (type === 1 ? modalList : drawerList)) {
        // 如果已经展开并且当前是点击的同一种类型，则关闭
        setIsExpanded(false);
        setCurrentItems([]);
      } else {
        // 否则切换到新类型并展开
        setIsExpanded(true);
        setCurrentItems(type === 1 ? modalList : drawerList);
      }
    },
    [isExpanded, modalList, drawerList, currentItems],
  );

  const handleItemClick = useCallback(
    (item: CollectorItem, type: string) => {
      setSelectedItem(item.id);
      if (type === 'double') {
        props.clickItem(item);
        setIsExpanded(false);
      }
    },
    [props],
  );

  const handleClose = useCallback((item: CollectorItem) => {
    setSelectedItem(null);
    props.closeItem(item);
  }, []);

  const handleDelete = useCallback((targetId: string) => {
    setSelectedItem(null);
    props.deleteItem(targetId);
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
                    <CloseCircleOutlined
                      onClick={(e) => {
                        e.stopPropagation();
                        handleClose(item);
                      }}
                    />
                    <Popconfirm title="警告" description="将删除此项目及其关联项目" icon={<QuestionCircleFilled style={{ color: 'red' }} />}>
                      <DeleteOutlined
                        style={{ marginLeft: '5px' }}
                        onClick={(e) => {
                          e.stopPropagation();
                          handleDelete(item.targetId);
                        }}
                      />
                    </Popconfirm>
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
