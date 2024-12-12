import React, { MouseEvent, useState, useEffect, memo, useMemo } from 'react';
import { useBlocker, useNavigate, useParams } from 'react-router-dom';
import { ConfigProvider, theme as AntdTheme, Modal } from 'antd';
import { useDrop } from 'react-dnd';
import { useDebounceFn, useKeyPress } from 'ahooks';
import { getComponent } from '@/packages/index';
import { IDragTargetItem } from '@/packages/types/index';
import { checkComponentType, createId, getElement } from '@/utils/util';
import storage from '@/utils/storage';
import api from '@/api/page';
import Toolbar from '@/components/Toolbar/Toolbar';
import { message } from '@/utils/AntdGlobal';
import { usePageStore } from '@/stores/pageStore';
import Page from '@/packages/Page/Page';
import PageConfig from '@/packages/Page/Schema';
import FloatingCollector from '@/components/FloatingCollector';
import { handleActionFlow } from '@/packages/utils/action';
import TopBar from './topbar/TopBar';
import styles from './index.module.less';
/**
 * 画布
 * 1. 从左侧拖拽组件到画布中
 * 2. 画布接收拖拽目标值，根据type动态渲染组件到画布中
 */
const Editor = () => {
  // 页面组件
  const {
    mode,
    isEdit,
    selectedElement,
    theme,
    elements,
    elementsMap,
    savePageInfo,
    addElement,
    addChildElements,
    setSelectedElement,
    removeElements,
    clearPageInfo,
    updateEditState,
  } = usePageStore((state) => {
    return {
      page: state.page,
      mode: state.mode,
      isEdit: state.isEdit,
      selectedElement: state.selectedElement,
      theme: state.page.pageData.config.props.theme,
      elements: state.page.pageData.elements,
      elementsMap: state.page.pageData.elementsMap,
      savePageInfo: state.savePageInfo,
      addElement: state.addElement,
      addChildElements: state.addChildElements,
      setSelectedElement: state.setSelectedElement,
      removeElements: state.removeElements,
      clearPageInfo: state.clearPageInfo,
      updateToolbar: state.updateToolbar,
      updatePageState: state.updatePageState,
      updateEditState: state.updateEditState,
    };
  });
  // 悬浮组件 - 展示悬浮条
  const [hoverTarget, setHoverTarget] = useState<HTMLElement | null>(null);
  const [loaded, setLoaded] = useState(false);
  const [modalList, setModalList] = useState<any[]>([]);
  const [drawerList, setDrawerList] = useState<any[]>([]);
  const [canvasWidth, setCanvasWidth] = useState('auto');
  const { id } = useParams();
  const navigate = useNavigate();

  // 监听页面变动，在路由切换的时候提示未修改
  const blocker = useBlocker(({ currentLocation, nextLocation }) => {
    return currentLocation.pathname !== nextLocation.pathname;
  });

  useEffect(() => {
    if (blocker.state === 'blocked') {
      if (isEdit) {
        Modal.confirm({
          title: '提示',
          content: '页面有未保存的内容，离开将失去修改内容',
          onOk: () => {
            blocker.proceed();
          },
          onCancel: () => {
            blocker.reset();
          },
        });
      } else {
        blocker.proceed();
      }
    }
  }, [blocker]);

  useEffect(() => {
    if (!id) return;
    setLoaded(false);
    setCanvasWidth(storage.get('canvasWidth') || 'auto');
    api
      .getPageDetail(parseInt(id))
      .then((res) => {
        let pageData: any = {};
        try {
          pageData = res.pageData ? JSON.parse(res.pageData) : { config: PageConfig.config };
        } catch (error) {
          pageData = { config: PageConfig.config };
          console.error(error);
          console.info('【json数据】', res.pageData);
          message.error('页面数据格式错误，请检查');
        }

        savePageInfo({ ...res, pageData });
        setTimeout(() => {
          updateEditState(false);
        }, 100);
        setLoaded(true);
      })
      .catch((res) => {
        if (res.code === 403) return navigate('/403');
        if (res.code === 404) return navigate('/404');
      });
    return () => {
      clearPageInfo();
      setHoverTarget(null);
      setSelectedElement(undefined);
    };
  }, [id]);

  // 当页面和用户有交互时，增加刷新和返回提示。
  useEffect(() => {
    const handleBeforeUnload = (event: BeforeUnloadEvent) => {
      // Cancel the event as stated by the standard.
      event.preventDefault();
      // Chrome requires returnValue to be set.
      event.returnValue = '';
    };
    window.addEventListener('beforeunload', handleBeforeUnload);
    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, []);

  // 拖拽接收
  const [, drop] = useDrop({
    accept: 'MENU_ITEM',
    async drop(item: IDragTargetItem, monitor: any) {
      // 此处必须检测该组件是否已经被放入完成，如果已经放置到其它容器中，直接返回。
      if (monitor.didDrop()) return;
      // 生成默认配置
      const { config, events, methods = [], elements = [] }: any = (await getComponent(item.type + 'Config'))?.default || {};

      if (!checkComponentType(item.type, selectedElement?.id, selectedElement?.type, elementsMap)) {
        message.info('请把表单项放在Form容器内');
        return;
      }
      const childElement =
        elements.map(async (child: IDragTargetItem) => {
          const { config, events, methods = [] }: any = (await getComponent(child.type + 'Config'))?.default || {};
          return {
            id: createId(child.type),
            name: child.name,
            type: child.type,
            parentId: item.id,
            config,
            events,
            methods,
          };
        }) || [];
      Promise.all(childElement).then((res) => {
        addElement({
          type: item.type,
          name: item.name,
          id: item.id,
          config,
          events,
          methods,
          elements: res,
        });
      });
    },
    collect: (monitor) => ({
      isOver: monitor.isOver(),
      canDrop: monitor.canDrop(),
    }),
  });

  // 点击画布，选中目标对象
  const handleClick = (event: MouseEvent) => {
    event.stopPropagation();
    if (mode === 'preview') return;
    const target = event.target as HTMLElement;
    // 如果当前点击的不是自定义组件，需要获取最近的组件对象
    const targetDom = target.closest('[data-id]') as HTMLElement;
    if (targetDom) {
      const id = targetDom?.dataset.id as string;
      if (id === selectedElement?.id) return;
      // 保存在store中，用于更新配置面板
      setSelectedElement({
        id,
        type: targetDom?.dataset.type,
      });
      setHoverTarget(null);
    } else if (selectedElement?.id) {
      setSelectedElement(undefined);
    }
  };

  // 鼠标悬浮事件
  const handleOver = (event: MouseEvent) => {
    const target = event.target as HTMLElement;
    if (mode === 'preview') return;
    // 如果当前点击的不是自定义组件，需要获取最近的组件对象
    const targetDom = target.closest('[data-id]') as HTMLElement;
    if (targetDom) {
      const componentid = targetDom?.dataset.id as string;
      if (componentid === selectedElement?.id || componentid === hoverTarget?.dataset.id) return;
      setHoverTarget(targetDom);
    } else if (hoverTarget) {
      setHoverTarget(null);
    }
    event.stopPropagation();
  };

  // 鼠标悬浮防抖监听
  const { run: handleRunOver } = useDebounceFn(handleOver, { wait: 300 });

  // 键盘快捷复制、删除事件
  useKeyPress(['ctrl.c', 'meta.c'], (event: any) => {
    if (['INPUT', 'TEXTAREA'].includes(event.target.tagName)) return;
    copyElement();
  });

  /**
   * 组件复制，需要考虑到嵌套组合情况
   * 1. 单个组件复制
   * 2. 多个组件复制
   * 3. 嵌套组件复制
   */
  useKeyPress(['ctrl.v', 'meta.v'], (event: any) => {
    if (['INPUT', 'TEXTAREA'].includes(event.target.tagName)) return;
    pastElement();
  });

  // 快捷删除
  useKeyPress(['delete', 'backspace'], (event: any) => {
    if (['INPUT', 'TEXTAREA'].includes(event.target.tagName) || event.target.contentEditable === 'true') return;
    delElement();
  });

  // 复制元素
  const copyElement = () => {
    storage.set('copy_component', selectedElement?.id);
  };

  // 粘贴元素
  const pastElement = () => {
    const id = storage.get('copy_component');
    if (!id) {
      return message.info('暂无复制内容');
    }
    let parentId = elementsMap[id]?.parentId;
    if (selectedElement?.id !== id) {
      parentId = selectedElement?.id;
    }
    // 如果没有父组件，在页面最外层先复制一个元素
    if (!parentId) {
      const { element: current } = getElement(elements, id);
      const newId = createId(id.split('_')[0]);
      addElement({
        ...elementsMap[id],
        elements: [],
        id: newId,
      });

      // 如果该元素存在子元素，需要递归复制
      deepCopy(current?.elements || [], newId);
    } else {
      const { element: current } = getElement(elements, id);
      // 复制元素时，需要从新生成组件ID
      const newId = createId(id.split('_')[0]);
      addChildElements({
        ...elementsMap[id],
        elements: [],
        parentId,
        id: newId,
      });
      // 如果该元素存在子元素，需要递归复制
      deepCopy(current?.elements || [], newId);
    }
  };

  // 深度递归复制
  function deepCopy(list: any[], parentId: string) {
    for (let i = 0; i < list.length; i++) {
      const pId = createId(list[i].id.split('_')[0]);
      addChildElements({
        ...elementsMap[list[i].id],
        parentId,
        elements: [],
        id: pId,
      });
      if (list[i].elements?.length > 0) {
        deepCopy(list[i].elements, pId);
      }
    }
  }

  // 删除元素
  const delElement = () => {
    if (selectedElement) {
      removeElements(selectedElement.id);
      if (selectedElement.type === 'Modal' || selectedElement.type === 'Drawer') {
        handleFloateItemDelete(selectedElement.id);
      }
    }
  };

  // 自适应时，需要计算画布宽度
  const editorWidth = useMemo(() => {
    if (canvasWidth !== 'auto') return '';
    const editorWidth = document.querySelector('#designer')?.getBoundingClientRect()?.width;
    return `${editorWidth}px`;
  }, [canvasWidth]);

  // 浮动组件点击事件
  const handleFloateItemClick = (item: any) => {
    handleActionFlow(item.events?.open, null);
  };

  // 浮动组件关闭事件
  const handleFloateItemClose = (item: any) => {
    handleActionFlow(item.events?.close, null);
  };

  // 浮动组件删除事件, 删除浮动组件, 同时删除页面中的组件
  const handleFloateItemDelete = (targetId: string) => {
    setModalList((prev) => prev.filter((item) => item.targetId !== targetId));
    setDrawerList((prev) => prev.filter((item) => item.targetId !== targetId));
    removeElements(targetId);
  };

  return (
    <div ref={drop} className={styles.designer} onClick={handleClick}>
      <TopBar updateCanvas={setCanvasWidth} canvasWidth={canvasWidth} />
      <ConfigProvider
        theme={{
          cssVar: true,
          hashed: false,
          algorithm: AntdTheme.defaultAlgorithm,
          token: {
            colorPrimary: theme || '#1677ff',
            colorLink: theme || '#1677ff',
            colorInfo: theme || '#1677ff',
          },
        }}
      >
        <div
          id="designer"
          className={styles['designer-editor']}
          style={{ height: mode === 'preview' ? 'calc(100vh - 64px)' : 'calc(100vh - 104px)' }}
        >
          <div
            id="editor"
            className={styles.pageWrapper}
            style={
              mode === 'preview'
                ? { height: 'calc(100vh - 64px)', overflow: 'auto', padding: 0 }
                : { width: canvasWidth === 'auto' ? editorWidth : canvasWidth }
            }
            onMouseOver={handleRunOver}
          >
            {/* 根据选中目标的相对位置，设置工具条 */}
            {mode === 'edit' && <Toolbar copyElement={copyElement} pastElement={pastElement} delElement={delElement} hoverTarget={hoverTarget} />}
            <React.Suspense fallback={<div>Loading...</div>}>{loaded && <Page />}</React.Suspense>
          </div>
        </div>
      </ConfigProvider>

      {/* 弹框收集器 */}
      {mode === 'edit' && <FloatingCollector />}
    </div>
  );
};

export default memo(Editor);
