import React, { MouseEvent, useState, useEffect, memo } from 'react';
import { useParams } from 'react-router-dom';
import { ConfigProvider, FloatButton, Image, Popover } from 'antd';
import { CommentOutlined, InfoCircleOutlined, QuestionCircleOutlined } from '@ant-design/icons';
import { useDrop } from 'react-dnd';
import { useDebounceFn, useKeyPress } from 'ahooks';
import * as Components from '@/packages/index';
import { Page } from '@/packages/Page';
import { IDragTargetItem } from '@/packages/types/index';
import { createId, getElement } from '@/utils/util';
import storage from '@/utils/storage';
import { getPageDetail } from '@/api';
import Toolbar from '@/components/Toolbar/Toolbar';
import { message } from '@/utils/AntdGlobal';
import { usePageStore } from '@/stores/pageStore';
import { PageConfig } from '@/packages/Page';
import './index.less';

/**
 * 画布
 * 1. 从左侧拖拽组件到画布中
 * 2. 画布接收拖拽目标值，根据type动态渲染组件到画布中
 */
const Editor = () => {
  // 页面组件
  const {
    mode,
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
  } = usePageStore((state) => {
    return {
      mode: state.mode,
      selectedElement: state.selectedElement,
      theme: state.page.config.props.theme,
      pageStyle: state.page.config.style,
      elements: state.page.elements,
      elementsMap: state.page.elementsMap,
      savePageInfo: state.savePageInfo,
      addElement: state.addElement,
      addChildElements: state.addChildElements,
      setSelectedElement: state.setSelectedElement,
      removeElements: state.removeElements,
      clearPageInfo: state.clearPageInfo,
    };
  });
  // 悬浮组件 - 展示悬浮条
  const [hoverTarget, setHoverTarget] = useState<HTMLElement | null>(null);
  const [loaded, setLoaded] = useState(false);
  const { id } = useParams();
  useEffect(() => {
    if (!id) return;
    setLoaded(false);
    getPageDetail(parseInt(id)).then((res) => {
      let pageData: any = {};
      try {
        pageData = JSON.parse(res.page_data || '{}');
      } catch (error) {
        console.error(error);
        console.info('【json数据】', res.page_data);
        message.error('页面数据格式错误，请检查');
      }
      savePageInfo({
        config: PageConfig.config,
        events: PageConfig.events,
        ...pageData,
        pageId: res.id,
        pageName: res.name,
        remark: res.remark,
        is_public: res.is_public,
        is_edit: res.is_edit,
        preview_img: res.preview_img,
        stg_publish_id: res.stg_publish_id,
        pre_publish_id: res.pre_publish_id,
        prd_publish_id: res.prd_publish_id,
        stg_state: res.stg_state,
        pre_state: res.pre_state,
        prd_state: res.prd_state,
        user_id: res.user_id,
      });
      setLoaded(true);
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
    drop(item: IDragTargetItem, monitor: any) {
      // 此处必须检测该组件是否已经被放入完成，如果已经放置到其它容器中，直接返回。
      if (monitor.didDrop()) return;
      // 生成默认配置
      const { config, events, methods = [], elements = [] }: any = Components[(item.type + 'Config') as keyof typeof Components] || {};
      const childElement =
        elements.map((child: IDragTargetItem) => {
          const { config, events, methods = [] }: any = Components[(child.type + 'Config') as keyof typeof Components] || {};
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
      addElement({
        type: item.type,
        name: item.name,
        id: item.id,
        config,
        events,
        methods,
        elements: childElement,
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

  const { run } = useDebounceFn(handleOver, { wait: 150 });

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
    }
  };

  return (
    <ConfigProvider
      theme={{
        cssVar: true,
        hashed: false,
        token: {
          colorPrimary: theme || '#1677ff',
          colorLink: theme || '#1677ff',
          colorInfo: theme || '#1677ff',
        },
      }}
    >
      <FloatButton.Group trigger="click" type="primary" style={{ insetInlineEnd: 24 }} icon={<InfoCircleOutlined />}>
        <Popover
          content={
            <>
              <p>1. 强烈建议直接点击左侧组件物料，无需拖拽即可渲染到画布中。</p>
              <p>2. 添加子组件时，直接选中父组件，点击左侧物料即可填充。</p>
              <p>3. 画布中的组件支持快捷键：ctrl+c/v 复制和粘贴；Del 删除。</p>
              <p>4. 表单组件，只能放在Form容器和搜索表单组件中，请勿单独使用。</p>
              <p>5. 支持接口调用，表单联动、自定义样式、逻辑编排，脚本运行，变量绑定等等。</p>
              <p>6. 页面支持通过微前端框架集成到自身传统项目中。</p>
              <p>7. 有任何技术和使用问题，请联系我，24H为你解答。</p>
            </>
          }
          title="使用说明(不建议使用拖拽功能)"
          placement="left"
        >
          <FloatButton icon={<QuestionCircleOutlined />} />
        </Popover>
        <Popover placement="left" title="加我微信" content={<Image width={180} src="https://marsview.cdn.bcebos.com/mywechat.jpg" />}>
          <FloatButton icon={<CommentOutlined />} />
        </Popover>
      </FloatButton.Group>
      {/* 编辑器 */}
      <div ref={drop} className={mode === 'edit' ? 'mars-editor' : 'mars-preview'}>
        {/* 页面渲染 */}
        <div
          id="editor"
          className="pageWrapper"
          style={mode === 'preview' ? { height: 'calc(100vh - 64px)', overflow: 'auto', padding: 0 } : { minWidth: 1440, height: '100%' }}
          onClick={handleClick}
          onMouseOver={run}
        >
          {/* 根据选中目标的相对位置，设置工具条 */}
          {mode === 'edit' && <Toolbar copyElement={copyElement} pastElement={pastElement} delElement={delElement} hoverTarget={hoverTarget} />}
          <React.Suspense fallback={<div>Loading...</div>}>{loaded && <Page />}</React.Suspense>
        </div>
      </div>
    </ConfigProvider>
  );
};

export default memo(Editor);
