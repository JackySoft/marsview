import React, { forwardRef, memo, useImperativeHandle, useState } from 'react';
import { ComponentType } from '../../types';
import { Drawer, Spin } from 'antd';
import MarsRender from '../../MarsRender/MarsRender';
import * as icons from '@ant-design/icons';
import { handleActionFlow } from '../../utils/action';
import AuthButton from '../../Functional/Button/AuthButton';

const AntDrawer = forwardRef(({ config, elements, onClose, onAfterOpenChange }: ComponentType, ref: any) => {
  const [visible, setVisible] = useState(false);
  const [loading, setLoading] = useState(false);

  useImperativeHandle(ref, () => {
    return {
      show() {
        setVisible(true);
      },
      hide() {
        setVisible(false);
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
        getContainer={false}
        afterOpenChange={(open) => handleOpenChange(open)}
        onClose={handleClose}
        footer={config.props.footer ? undefined : null}
        style={{ ...config.style }}
        zIndex={998}
        extra={
          <div>
            {bulkActionList.map((item: any, index: number) => {
              return (
                <AuthButton
                  type={item.type}
                  danger={item.danger}
                  icon={item.icon ? React.createElement(iconsList[item.icon]) : null}
                  onClick={() => handleOperate(item.eventName)}
                  key={item.eventName}
                  style={{ marginRight: 8 }}
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
