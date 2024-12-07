import { memo, useEffect, useMemo, useState } from 'react';
import { Tree, Row } from 'antd';
import { DownOutlined } from '@ant-design/icons';
import { usePageStore } from '@/stores/pageStore';
import { useShallow } from 'zustand/react/shallow';
import style from './index.module.less';
import { cloneDeep } from 'lodash-es';
import { getElement } from '@/utils/util';
/**
 * 大纲
 */
const OutlinePanel = memo(() => {
  const { pageName, elements, selectedEl, setSelectedElement, dragSortElements } = usePageStore(
    useShallow((state) => ({
      pageName: state.page.name,
      elements: state.page.pageData.elements,
      selectedEl: state.selectedElement,
      setSelectedElement: state.setSelectedElement,
      dragSortElements: state.dragSortElements,
    })),
  );
  const [selectedKeys, setSelectedKeys] = useState<string[]>([]);

  const treeData: any = useMemo(
    () => [
      {
        type: `页面【${pageName}】`,
        id: 'page',
        elements,
      },
    ],
    [elements],
  );

  useEffect(() => {
    if (selectedEl) {
      setSelectedKeys([selectedEl.id]);
    } else {
      setSelectedKeys([]);
    }
  }, [selectedEl]);

  // 组件选择，画布中的组件会同步选中。
  const handleSelect = (selectedKeys: any, { node }: any) => {
    setSelectedKeys(selectedKeys);
    if (selectedKeys.length > 0) {
      if (selectedKeys[0] === 'page') {
        setSelectedElement(undefined);
      } else {
        setSelectedElement({
          id: node.id,
          type: node.type,
        });
      }
    } else {
      setSelectedElement(undefined);
    }
  };

  // 拖拽排序
  const onDrop = (info: any) => {
    const { key: dragKey, type: dragType, name, elements: dragChildren } = info.dragNode;
    const { key: dropKey } = info.node;
    const dropPos = info.node.pos.split('-');
    const dropPosition = info.dropPosition - Number(dropPos[dropPos.length - 1]); // the drop position relative to the drop node, inside 0, top -1, bottom 1

    const list: any[] = cloneDeep(elements);

    // 拖拽排序后，删除原组件
    const result = getElement(list, dragKey);
    if (result && result.elements) {
      result.elements.splice(result.index, 1);
    }
    // 拖拽后的新节点
    const dropItem = {
      id: dragKey,
      type: dragType,
      name,
      elements: dragChildren,
    };
    let parentId = null;
    // 移动到组件里面，添加为子组件
    if (!info.dropToGap) {
      if (dropKey == 'page') {
        list.unshift(dropItem);
      } else {
        const { element } = getElement(list, dropKey);
        if (element) {
          parentId = dropKey;
          element.elements = element.elements || [];
          element.elements.unshift({ ...dropItem, parentId: dropKey });
        }
      }
    } else {
      const { index, elements } = getElement(list, dropKey) || { item: {}, index: 0 };
      parentId = elements[index].parentId;
      if (dropPosition === -1) {
        elements?.splice(index, 0, { ...dropItem, parentId });
      } else {
        elements?.splice(index + 1, 0, { ...dropItem, parentId });
      }
    }
    dragSortElements({ id: dragKey, list, parentId });
    setSelectedKeys([]);
  };

  return (
    <Row className={style.outlinePanel}>
      <Tree
        showLine
        defaultExpandAll
        draggable
        switcherIcon={<DownOutlined />}
        fieldNames={{ title: 'type', key: 'id', children: 'elements' }}
        treeData={treeData}
        selectedKeys={selectedKeys}
        onSelect={handleSelect}
        onDrop={onDrop}
        style={{ width: '100%' }}
      />
    </Row>
  );
});

export default OutlinePanel;
