import React, { lazy, useEffect, useState } from 'react';
import { Outlet } from 'react-router-dom';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { ConfigProvider, Splitter } from 'antd';
import { useShallow } from 'zustand/react/shallow';
import { usePageStore } from '@/stores/pageStore';
import SpinLoading from '@/components/SpinLoading';
import './layout.less';
import Notice from './components/Notice';

const Menu = lazy(() => import('./components/Menu'));
const ConfigPanel = lazy(() => import('./components/ConfigPanel/ConfigPanel'));
/**
 * 编辑器布局组件
 */
const EditLayout = () => {
  const [sizes, setSizes] = useState<(number | string)[]>([320, window.innerWidth - 640, 320]);
  const mode = usePageStore(useShallow((state) => state.mode));

  useEffect(() => {
    if (mode === 'preview') {
      setSizes([0, '100%', 0]);
    } else {
      setSizes([320, window.innerWidth - 640, 320]);
    }
  }, [mode]);
  // 模式切换，会导致子组件重新渲染
  return (
    <DndProvider backend={HTML5Backend}>
      {/* 编辑器 */}
      <div style={{ height: 'calc(100vh - 64px)' }}>
        <Notice />
        <ConfigProvider
          theme={{
            components: {
              Splitter: {
                colorFill: '#e8e9eb',
                controlItemBgActive: '#7d33ff',
                controlItemBgActiveHover: '#7d33ff',
              },
            },
          }}
        >
          <Splitter onResize={setSizes}>
            <Splitter.Panel collapsible size={sizes[0]} min={320}>
              <React.Suspense fallback={<SpinLoading />}>
                <Menu />
              </React.Suspense>
            </Splitter.Panel>
            <Splitter.Panel size={sizes[1]}>
              <Outlet></Outlet>
            </Splitter.Panel>
            <Splitter.Panel collapsible size={sizes[2]} min={320}>
              <React.Suspense fallback={<SpinLoading />}>
                <ConfigPanel />
              </React.Suspense>
            </Splitter.Panel>
          </Splitter>
        </ConfigProvider>
      </div>
    </DndProvider>
  );
};

export default EditLayout;
