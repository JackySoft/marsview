import { Space, Tooltip } from 'antd';
import { CopyOutlined, DeleteOutlined, ArrowUpOutlined, ArrowDownOutlined } from '@ant-design/icons';
import { memo, useEffect, useState } from 'react';
import { getBoundingClientRect } from '@/utils/util';
import { usePageStore } from '@/stores/pageStore';
import './index.less';
const Toolbar = memo(({ hoverTarget, copyElement, pastElement, delElement }: any) => {
  // 页面组件
  const { selectedElement, elements, nodeNav, isUpdateToolbar, setSelectedElement, moveElements } = usePageStore((state) => {
    const currentId = state.selectedElement?.id;
    const element = currentId ? state.page.pageData.elementsMap[currentId] : null;
    const nodeNav: { [key: string]: { id: string; type: string; name: string } } = {};
    if (element) {
      // 查找父节点
      if (element.parentId) {
        const { id, type, name } = state.page.pageData.elementsMap[element.parentId];
        nodeNav['parent'] = { id, type, name };
      }
      // 当前选中节点
      nodeNav['current'] = { id: element.id, type: element.type, name: element.name };
      // 查找子节点
      const childElement = Object.values(state.page.pageData.elementsMap).find((item) => item.parentId === element.id);
      if (childElement) {
        nodeNav['child'] = { id: childElement.id, type: childElement.type, name: childElement.name };
      }
    }
    return {
      selectedElement: state.selectedElement,
      elements: state.page.pageData.elements,
      nodeNav,
      isUpdateToolbar: state.isUpdateToolbar,
      setSelectedElement: state.setSelectedElement,
      moveElements: state.moveElements,
    };
  });

  const [selectedStyle, setSelectedStyle] = useState({});
  const [hoverStyle, setHoverStyle] = useState({});
  const [direction, setDirection] = useState<string>('rightTop');

  /**
   * 当元素属性发生变化时，重新渲染工具条
   */
  useEffect(() => {
    if (!selectedElement) {
      setSelectedStyle({});
      setDirection('');
      return;
    }
    // 加延迟的目的是，组件先渲染，再重新计算位置
    setTimeout(() => {
      const target: HTMLElement | null = document.querySelector(`[data-id=${selectedElement?.id}]`);
      if (!target) return;
      const style = getBoundingClientRect(target);
      if (target.offsetLeft < 144 - style.width) {
        setDirection('bottomLeft');
      } else if (target.offsetTop < 24) {
        setDirection('bottomRight');
      } else {
        setDirection('rightTop');
      }
      setSelectedStyle(style);
    }, 50);
  }, [selectedElement, elements, isUpdateToolbar]);

  /**
   * 鼠标悬浮时工具条样式
   */
  useEffect(() => {
    if (hoverTarget) {
      const style = getBoundingClientRect(hoverTarget);
      setHoverStyle({ ...style });
    } else {
      setHoverStyle({ ...hoverStyle, visibility: 'hidden' });
    }
  }, [hoverTarget]);

  // 节点导航
  const handleNav = (event: React.MouseEvent, { id, type }: { id: string; type: string }) => {
    if (!id || !type) return;
    setSelectedElement({
      id,
      type,
    });
    event.stopPropagation();
  };

  /**
   * 画布中组件排序，取消画布中组件拖拽排序，改为通过工具栏功能操作排序
   * @param componentId
   * @param direction
   */
  const moveCard = (event: React.MouseEvent, direction?: string) => {
    moveElements({
      componentId: selectedElement?.id,
      direction,
    });
    event.stopPropagation();
  };

  return (
    <>
      <div className={selectedElement ? 'toolbar-box selected' : 'toolbar-box'} style={selectedStyle} id="editorToolbar">
        <div className={'tool-bar ' + direction}>
          {/* 节点导航：只渲染父节点、当前节点和子节点 */}
          <div className="node-nav">
            {nodeNav.parent && (
              <span className="node-tip parent" onClick={(event) => handleNav(event, nodeNav.parent)}>
                {nodeNav.parent?.name || nodeNav.parent?.type}
              </span>
            )}
            <span className="node-tip current" onClick={(event) => handleNav(event, nodeNav.current)}>
              {nodeNav.current?.name || nodeNav.current?.type}
            </span>
            {nodeNav.child && (
              <span className="node-tip child" onClick={(event) => handleNav(event, nodeNav.child)}>
                {nodeNav.child?.name || nodeNav.child?.type}
              </span>
            )}
          </div>
          {/* 操作按钮 */}
          <Space className="actions">
            <Tooltip title="上移动">
              <ArrowUpOutlined onClick={(event) => moveCard(event, 'up')} />
            </Tooltip>
            <Tooltip title="下移动">
              <ArrowDownOutlined onClick={(event) => moveCard(event, 'down')} />
            </Tooltip>
            <Tooltip title="复制">
              <CopyOutlined
                onClick={(event) => {
                  copyElement();
                  pastElement();
                  event.stopPropagation();
                }}
              />
            </Tooltip>
            <Tooltip title="删除">
              <DeleteOutlined
                onClick={(event) => {
                  delElement();
                  event.stopPropagation();
                }}
              />
            </Tooltip>
          </Space>
        </div>
      </div>
      {/* 组件虚浮样式 */}
      <div className={hoverTarget ? 'toolbar-box hover' : 'toolbar-box'} style={hoverStyle}></div>
    </>
  );
});

export default Toolbar;
