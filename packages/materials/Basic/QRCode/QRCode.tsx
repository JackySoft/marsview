import { forwardRef, useEffect, useImperativeHandle, useState } from 'react';
import { QRCode } from 'antd';
import { ComponentType } from '@materials/types';
import { omit } from 'lodash-es';

export type QRStatus = 'active' | 'expired' | 'loading' | 'scanned';

/*泛型只需要定义组件本身用到的属性*/
export interface IConfig {
  value: string;
  type?: 'canvas' | 'svg';
  icon?: string;
  size?: number;
  iconSize?: number | { width: number; height: number };
  color?: string;
  bgColor?: string;
  bordered?: boolean;
  errorLevel?: 'L' | 'M' | 'Q' | 'H';
  status: QRStatus;
}
/**
 *
 * @param props 组件本身属性
 * @param style 组件样式
 * @returns
 */
const MQRCode = ({ config }: ComponentType<IConfig>, ref: any) => {
  const [statusEffect, setStatusEffect] = useState<QRStatus>(config.props.status);
  const [visible, setVisible] = useState(true);
  // 对外暴露方法
  useImperativeHandle(ref, () => {
    return {
      show() {
        setVisible(true);
      },
      hide() {
        setVisible(false);
      },
      changeQRCodeStatus({ status }: { status: QRStatus }) {
        setStatusEffect(status);
      },
    };
  });

  useEffect(() => {
    setStatusEffect(config.props.status);
  }, [config.props.status]);

  const props = omit(config.props, ['status']);

  return visible && <QRCode style={config.style} {...props} status={statusEffect}></QRCode>;
};
export default forwardRef(MQRCode);
