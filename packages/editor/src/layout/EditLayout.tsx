import { useState } from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import ConfigPanel from './components/ConfigPanel/ConfigPanel';
import Menu from './components/Menu';
import { Outlet } from 'react-router-dom';
import { Allotment } from 'allotment'; //面板分割、拖拽
import { usePageStore } from '@/stores/pageStore';
import 'allotment/dist/style.css';
import './layout.less';

/**
 * 编辑器布局组件
 */
const EditLayout = () => {
  const [isOpen, setOpen] = useState<boolean>(true);
  const { mode, updateToolbar } = usePageStore((state) => ({ mode: state.mode, updateToolbar: state.updateToolbar }));
  const toggleOpen = (status: boolean) => {
    if (status === isOpen) return;
    setOpen(!isOpen);
  };

  // 模式切换，会导致子组件重新渲染
  return (
    <DndProvider backend={HTML5Backend}>
      {/* 编辑器 */}
      <div style={{ height: 'calc(100vh - 64px)' }}>
        <Allotment onChange={updateToolbar}>
          {/* 左侧组件，菜单展开后，最小320不可缩小，菜单关闭后，拖拽面板不可见 */}
          {mode === 'edit' && (
            <Allotment.Pane preferredSize={320} minSize={isOpen ? 320 : 49} maxSize={isOpen ? 800 : 49}>
              <Menu toggleOpen={toggleOpen} isOpen={isOpen} />
            </Allotment.Pane>
          )}

          {/* 编辑器 */}
          <Allotment.Pane>
            <Outlet></Outlet>
          </Allotment.Pane>

          {/* 属性面板 */}
          {mode === 'edit' && (
            <Allotment.Pane preferredSize={300} minSize={300} maxSize={800}>
              <ConfigPanel />
            </Allotment.Pane>
          )}
        </Allotment>
      </div>
    </DndProvider>
  );
};

export default EditLayout;
