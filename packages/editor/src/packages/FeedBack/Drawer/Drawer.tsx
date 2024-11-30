import React, { forwardRef, memo, useImperativeHandle, useState } from 'react';
import { ComponentType, IDragTargetItem } from '@/packages/types';
import { usePageStore } from '@/stores/pageStore';
import { useDrop } from 'react-dnd';
import { Button, Drawer, Spin } from 'antd';
import MarsRender from '@/packages/MarsRender/MarsRender';
import { getComponent } from '@/packages/index';
import * as icons from '@ant-design/icons';
import { handleActionFlow } from '@/packages/utils/action';

const AntDrawer = forwardRef(({ id, type, config, elements, onClose, onAfterOpenChange }: ComponentType, ref: any) => {
  const [visible, setVisible] = useState(false);
  const [loading, setLoading] = useState(false);

  const addChildElements = usePageStore((state) => state.addChildElements);

  const [, drop] = useDrop({
    accept: 'MENU_ITEM',
    async drop(item: IDragTargetItem, monitor) {
      if (monitor.didDrop()) return;
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
    collect: (monitor) => ({
      isOver: monitor.isOver(),
      canDrop: monitor.canDrop(),
    }),
  });

  useImperativeHandle(ref, () => {
    return {
      // 关闭弹框
      close: () => {
        setVisible(false);
      },
      // 打开弹框
      open: () => {
        return new Promise((resolve) => {
          setVisible(() => {
            resolve(true);
            return true;
          });
        });
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
  });

  const handleOpenChange = (open: boolean) => {
    onAfterOpenChange?.(open);
  };

  const handleClose = () => {
    setVisible(false);
    onClose?.(); // 关闭时触发回调
  };

  const handleOperate = (eventName: string) => {
    const btnEvent = config.events.find((event) => event.eventName === eventName);
    handleActionFlow(btnEvent?.actions, {});
  };

  const bulkActionList = config.props.bulkActionList || [];
  const iconsList: { [key: string]: any } = icons;

  return (
    <>
      <Drawer
        {...config.props}
        data-id={id}
        data-type={type}
        open={visible}
        footer={config.props.footer ? undefined : null}
        getContainer={false}
        afterOpenChange={(open) => handleOpenChange(open)}
        onClose={handleClose}
        style={{ ...config.style }}
        zIndex={998}
        extra={
          <div style={{ display: 'flex', gap: 10 }}>
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
          </div>
        }
      >
        <div ref={drop}>
          <Spin spinning={loading}>
            {elements?.length ? (
              <MarsRender elements={elements || []} />
            ) : (
              <div className="slots" style={{ lineHeight: '100px' }}>
                拖拽组件到这里
              </div>
            )}
          </Spin>
        </div>
      </Drawer>
    </>
  );
});

export default memo(AntDrawer);
