import { Outlet } from 'react-router-dom';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { ConfigProvider, Splitter } from 'antd';
import ConfigPanel from './components/ConfigPanel/ConfigPanel';
import Menu from './components/Menu';
import { usePageStore } from '@/stores/pageStore';
import './layout.less';

/**
 * 编辑器布局组件
 */
const EditLayout = () => {
  const mode = usePageStore((state) => state.mode);
  // 模式切换，会导致子组件重新渲染
  return (
    <DndProvider backend={HTML5Backend}>
      {/* 编辑器 */}
      <div style={{ height: 'calc(100vh - 64px)' }}>
        <ConfigProvider
          theme={{
            components: {
              Splitter: {
                controlItemBgActiveHover: '#7d33ff',
              },
            },
          }}
        >
          <Splitter>
            <Splitter.Panel collapsible size={mode === 'preview' ? 0 : undefined} defaultSize={300} min={300} max={800}>
              <Menu />
            </Splitter.Panel>
            <Splitter.Panel size={mode === 'preview' ? '100%' : ''} defaultSize={'100%'}>
              <Outlet></Outlet>
            </Splitter.Panel>
            <Splitter.Panel collapsible size={mode === 'preview' ? 0 : undefined} defaultSize={320} min={320} max={800}>
              <ConfigPanel />
            </Splitter.Panel>
          </Splitter>
        </ConfigProvider>
      </div>
    </DndProvider>
  );
};

export default EditLayout;
