import React, { forwardRef, memo, useImperativeHandle, useState } from 'react';
import { ComponentType } from '@materials/types';
import { Drawer, Spin } from 'antd';
import MarsRender from '@materials/MarsRender/MarsRender';
import * as icons from '@ant-design/icons';
import { handleActionFlow } from '@materials/utils/action';
import AuthButton from '@materials/Functional/Button/AuthButton';

const AntDrawer = forwardRef(({ config, elements, onClose, onAfterOpenChange }: ComponentType, ref: any) => {
  const [visible, setVisible] = useState(false);
  const [loading, setLoading] = useState(false);

  useImperativeHandle(ref, () => {
    return {
      // 关闭弹框
      close: () => {
        setVisible(() => false);
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
        open={visible}
        afterOpenChange={(open) => handleOpenChange(open)}
        onClose={handleClose}
        footer={config.props.footer ? undefined : null}
        style={{ ...config.style }}
        extra={
          <div style={{ display: 'flex', gap: 10 }}>
            {bulkActionList.map((item: any, index: number) => {
              return (
                <AuthButton
                  key={item.eventName}
                  type={item.type}
                  danger={item.danger}
                  icon={item.icon ? React.createElement(iconsList[item.icon]) : null}
                  onClick={() => handleOperate(item.eventName)}
                  authCode={item.authCode}
                  authScript={item.authScript}
                >
                  {item.text}
                </AuthButton>
              );
            })}
          </div>
        }
      >
        <Spin spinning={loading}>
          <MarsRender elements={elements || []} />
        </Spin>
      </Drawer>
    </>
  );
});

export default memo(AntDrawer);
