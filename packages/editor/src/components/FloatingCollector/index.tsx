import React, { useCallback, useState } from 'react';
import styles from './index.module.less';
import { Badge, Button, Popconfirm } from 'antd';
import { CloseCircleFilled, CloseCircleOutlined, DeleteOutlined, QuestionCircleFilled } from '@ant-design/icons';

// modalList.push({
//   id: createId(item.type),
//   name: item.name,
//   type: item.type,
//   config,
//   events,
//   methods,
//   elements,
// });

interface CollectorItem {
  id: string;
  name?: string;
  type: string;
  config?: any;
  methods?: any;
  events?: any;
  elements?: any;
}

interface FloatingCollectorProps {
  modalList: CollectorItem[];
  drawerList: CollectorItem[];
  clickItem: (item: CollectorItem) => void;
}

const FloatingCollector = (props: FloatingCollectorProps) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [selectedItem, setSelectedItem] = useState<string | null>(null);
  const [currentItems, setCurrentItems] = useState<CollectorItem[]>([]);

  const { modalList, drawerList } = props;

  const handleTypeClick = useCallback((type: number) => {
    setIsExpanded(true);
    if (type === 1) {
      setCurrentItems(modalList);
    } else if (type === 2) {
      setCurrentItems(drawerList);
    }

  }, [modalList, drawerList]);

  const handleItemClick = useCallback((item: CollectorItem) => {
    setSelectedItem(item.id);
    props.clickItem(item);
  }, []);

  const handleClose = useCallback((item: CollectorItem) => {
      setSelectedItem(null);
  }, [currentItems]);

  return (
    <div
      className={styles.container}
    >
      <div className={`${styles.collectorContent} ${isExpanded ? styles.expanded : ''}`}>
        <div className={styles.itemList}>
          {currentItems.map((item) => (
            <Button
              key={item.id}
              onClick={() => handleItemClick(item)}
              className={`${styles.item} ${selectedItem === item.id ? styles.active : ''}`}
            >
              <span className={styles.title}>{item.name}</span>
              <span className={styles.action}>
                <CloseCircleOutlined onClick={(e) => {
                  e.stopPropagation();
                  handleClose(item);
                }} />
                <Popconfirm
                  title="警告"
                  description="将删除此项目及其关联项目"
                  icon={<QuestionCircleFilled style={{ color: 'red' }} />}
                >
                  <DeleteOutlined style={{marginLeft: '5px'}} />
                </Popconfirm>
              </span>
            </Button>
          ))}
        </div>
      </div>
      <div className={styles.iconContainer}>
        <Button className={styles.iconButton} onClick={()=> handleTypeClick(1)}>
          <Badge count={modalList.length} size='small' color='#7d3fff'>
            <ModalIcon />
          </Badge>
          <span style={{marginLeft: '5px'}}>弹窗</span>
        </Button>
        <Button className={styles.iconButton} onClick={()=> handleTypeClick(2)}>
          <Badge count={drawerList.length}  size='small' color='#7d3fff'>
            <DrawerIcon />
          </Badge>
          <span style={{marginLeft: '5px'}}>抽屉</span>
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

const NotificationIcon: React.FC = () => (
  <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M4 4h16a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2z" stroke="currentColor" strokeWidth="2" />
    <path d="M8 9h8M8 13h4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
  </svg>
);

export default FloatingCollector;

