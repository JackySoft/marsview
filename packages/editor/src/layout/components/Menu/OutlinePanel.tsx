import { usePageStore } from '@/stores/pageStore';
import { DownOutlined } from '@ant-design/icons';
import { Tree, Row } from 'antd';
import { useState } from 'react';

/**
 * 大纲
 */
const OutlinePanel = () => {
  const { pageName, elements, setSelectedElement } = usePageStore((state) => ({
    pageName: state.page.pageName,
    elements: state.page.elements,
    setSelectedElement: state.setSelectedElement,
  }));
  const [selectedKeys, setSelectedKeys] = useState<string[]>([]);

  const treeData: any = [
    {
      type: `页面【${pageName}】`,
      id: 'page',
      elements,
    },
  ];
  const handleSelect = (selectedKeys: any, { node }: any) => {
    setSelectedKeys(selectedKeys);
    if (selectedKeys.length > 0) {
      setSelectedElement({
        id: node.id,
        type: node.type,
      });
    } else {
      setSelectedElement(undefined);
    }
  };

  return (
    <Row style={{ paddingRight: '24px', height: 'calc(100vh - 110px)', overflowY: 'auto' }}>
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
};

export default OutlinePanel;
