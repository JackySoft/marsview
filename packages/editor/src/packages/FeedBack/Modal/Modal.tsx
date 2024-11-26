import { ComponentType, IDragTargetItem } from '@/packages/types';
import { Modal, Spin } from 'antd';
import { forwardRef, memo, useEffect, useImperativeHandle, useState } from 'react';
import { useDrop } from 'react-dnd';
import { getComponent } from '@/packages/index';
import MarsRender from '@/packages/MarsRender/MarsRender';
import { usePageStore } from '@/stores/pageStore';
import './index.less';

/**
 *
 * @param props 组件本身属性
 * @param style 组件样式
 * @returns
 */
const AntdModal = forwardRef(({ id, type, config, elements, onLoad, onOk, onCancel }: ComponentType, ref: any) => {
  const [visible, setVisible] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(config.props.confirmLoading || false);
  const [loading, setLoading] = useState(false);
  const { mode, addChildElements, setSelectedElement } = usePageStore((state) => ({
    mode: state.mode,
    addChildElements: state.addChildElements,
    setSelectedElement: state.setSelectedElement,
  }));
  // 拖拽接收
  const [, drop] = useDrop({
    accept: 'MENU_ITEM',
    async drop(item: IDragTargetItem, monitor) {
      if (monitor.didDrop()) return;
      // 生成默认配置
      const { config, events, methods = [] }: any = (await getComponent(item.type + 'Config'))?.default || {};
      addChildElements({
        type: item.type,
        name: item.name,
        parentId: id,
        id: item.id,
        config,
        events,
        methods,
      });
    },
    // TODO: 拖拽组件时，容器呈现背景色（后期需要判断组件是否可以拖入）
    collect: (monitor) => ({
      isOver: monitor.isOver(),
      canDrop: monitor.canDrop(),
    }),
  });

  // 对外暴露方法
  useImperativeHandle(
    ref,
    () => {
      return {
        // 关闭弹框
        close: () => {
          setVisible(false);
        },
        // 打开弹框
        open: () => {
          return new Promise((resolve) => {
            setVisible(true);
            setTimeout(() => {
              resolve(true);
              setSelectedElement({
                id,
                type,
              });
            }, 0);
          });
        },
        // 显示确认Loading
        showConfirmLoading: () => {
          setConfirmLoading(true);
        },
        // 隐藏确认Loading
        hideConfirmLoading: () => {
          setConfirmLoading(false);
        },
        // 显示确认Loading
        showLoading: () => {
          setLoading(true);
        },
        // 隐藏确认Loading
        hideLoading: () => {
          setLoading(false);
        },
      };
    },
    [],
  );

  useEffect(() => {
    if (visible) onLoad?.();
    const rect = document.querySelector('#page')?.getBoundingClientRect();
    const modal: HTMLDivElement | null = document.querySelector(`[data-id="${id}"]`);
    if (modal) modal.style.height = rect?.height + 'px';
  }, [visible]);

  const handleOk = () => {
    // 提交事件
    onOk?.();
  };

  const handleCancel = () => {
    onCancel?.();
    // 取消事件
    setVisible(false);
    setTimeout(() => {
      setSelectedElement(undefined);
    }, 0);
  };
  /**
   * 开发模式下处理弹框根样式
   * 弹框关闭后，需要隐藏根节点，否则页面元素无法选择
   */
  const modal: HTMLDivElement | null = document.querySelector(`[data-id="${id}"]`);
  if (visible && modal) {
    modal.style.display = '';
  } else if (modal) {
    modal.style.display = 'none';
  }
  return (
    <>
      <Modal
        {...config.props}
        data-id={id}
        data-type={type}
        open={visible}
        footer={config.props.footer ? undefined : null}
        getContainer={false}
        onOk={handleOk}
        maskClosable={false}
        onCancel={handleCancel}
        width={config.props.width || undefined}
        confirmLoading={confirmLoading}
        style={{ ...config.style }}
      >
        <div ref={drop}>
          <Spin spinning={loading}>
            {elements.length ? (
              <MarsRender elements={elements} />
            ) : (
              <div className="slots" style={{ lineHeight: '150px' }}>
                拖拽组件到这里
              </div>
            )}
          </Spin>
        </div>
      </Modal>
    </>
  );
});
export default memo(AntdModal);
