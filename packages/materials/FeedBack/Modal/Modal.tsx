import { ComponentType } from '@materials/types';
import { Modal, Spin } from 'antd';
import { forwardRef, memo, useEffect, useImperativeHandle, useState } from 'react';
import MarsRender from '@materials/MarsRender/MarsRender';

/**
 *
 * @param props 组件本身属性
 * @param style 组件样式
 * @returns
 */
const AntdModal = forwardRef(({ config, elements, onLoad, onOk, onCancel }: ComponentType, ref: any) => {
  const [visible, setVisible] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(config.props.confirmLoading);
  const [loading, setLoading] = useState(false);
  // 对外暴露方法
  useImperativeHandle(
    ref,
    () => {
      return {
        // 关闭弹框
        close: () => {
          setVisible(() => false);
        },
        // 打开弹框
        open: () => {
          return new Promise((resolve) => {
            setVisible(true);
            setTimeout(() => resolve(true), 0);
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
  }, [visible]);

  const handleOk = () => {
    // 提交事件
    onOk?.();
  };

  const handleCancel = () => {
    onCancel?.();
    // 取消事件
    setVisible(false);
  };
  return (
    <>
      <Modal
        {...config.props}
        open={visible}
        footer={config.props.footer ? undefined : null}
        onOk={handleOk}
        onCancel={handleCancel}
        width={config.props.width || undefined}
        confirmLoading={confirmLoading}
        style={{ ...config.style }}
      >
        <Spin spinning={loading}>
          <MarsRender elements={elements} />
        </Spin>
      </Modal>
    </>
  );
});
export default memo(AntdModal);
