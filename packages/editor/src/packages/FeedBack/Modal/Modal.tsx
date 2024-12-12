import { ComponentType, IDragTargetItem } from '@/packages/types';
import { Modal, Spin, Button } from 'antd';
import React, { forwardRef, memo, useEffect, useImperativeHandle, useState } from 'react';
import { useDrop } from 'react-dnd';
import { getComponent } from '@/packages/index';
import MarsRender from '@/packages/MarsRender/MarsRender';
import { usePageStore } from '@/stores/pageStore';
import * as icons from '@ant-design/icons';
import { handleActionFlow } from '@/packages/utils/action';

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
  const { addChildElements, setSelectedElement } = usePageStore((state) => ({
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

  const handleOperate = (eventName: string) => {
    const btnEvent = config.events.find((event) => event.eventName === eventName);
    handleActionFlow(btnEvent?.actions, {});
  };

  const bulkActionList = config.props.bulkActionList || [];
  const iconsList: { [key: string]: any } = icons;
  return (
    <>
      <Modal
        {...config.props}
        data-id={id}
        data-type={type}
        open={visible}
        getContainer={false}
        onOk={handleOk}
        maskClosable={false}
        onCancel={handleCancel}
        width={config.props.width || undefined}
        confirmLoading={confirmLoading}
        footer={
          bulkActionList.length > 0 ? (
            <>
              {bulkActionList.map((item: any, index: number) => {
                return (
                  <Button
                    key={item.eventName}
                    type={item.type}
                    danger={item.danger}
                    icon={item.icon ? React.createElement(iconsList[item.icon]) : null}
                    onClick={() => handleOperate(item.eventName)}
                  >
                    {item.text}
                  </Button>
                );
              })}
            </>
          ) : undefined
        }
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
