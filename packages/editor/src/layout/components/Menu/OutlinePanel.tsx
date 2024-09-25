import { memo, useEffect, useState } from 'react';
import { Tree, Row } from 'antd';
import { DownOutlined } from '@ant-design/icons';
import { usePageStore } from '@/stores/pageStore';
import { useShallow } from 'zustand/react/shallow';
import style from './index.module.less';
/**
 * 大纲
 */
const OutlinePanel = memo(() => {
  const { pageName, elements, selectedEl, setSelectedElement } = usePageStore(
    useShallow((state) => ({
      pageName: state.page.pageName,
      elements: state.page.elements,
      selectedEl: state.selectedElement,
      setSelectedElement: state.setSelectedElement,
    })),
  );
  const [selectedKeys, setSelectedKeys] = useState<string[]>([]);

  const treeData: any = [
    {
      type: `页面【${pageName}】`,
      id: 'page',
      elements,
    },
  ];

  useEffect(() => {
    if (selectedEl) {
      setSelectedKeys([selectedEl.id]);
    } else {
      setSelectedKeys([]);
    }
  }, [selectedEl]);
  const handleSelect = (selectedKeys: any, { node }: any) => {
    setSelectedKeys(selectedKeys);
    if (selectedKeys.length > 0) {
      if(selectedKeys[0] === 'page'){
        setSelectedElement(undefined);
      }else{
        setSelectedElement({
          id: node.id,
          type: node.type,
        });
      }
    } else {
      setSelectedElement(undefined);
    }
  };

  return (
    <Row className={style.outlinePanel}>
      <Tree
        showLine
        defaultExpandAll
        switcherIcon={<DownOutlined />}
        fieldNames={{ title: 'type', key: 'id', children: 'elements' }}
        treeData={treeData}
        selectedKeys={selectedKeys}
        onSelect={handleSelect}
      />
    </Row>
  );
});

export default OutlinePanel;
