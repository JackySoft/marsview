import React, { forwardRef, useImperativeHandle, useState } from 'react';
import { Button, ButtonProps, Result } from 'antd';
import * as icons from '@ant-design/icons';
import { ComponentType } from '@materials/types';
import { handleActionFlow } from '@materials/utils/action';

/*泛型只需要定义组件本身用到的属性*/
export interface IConfig {
  /** 操作区 */
  extra: React.ReactNode;
  /** 图标 */
  icon: React.ReactNode;
  /** 结果的状态，决定图标和颜色 */
  status: 'success' | 'error' | 'info' | 'warning' | 404 | 403 | 500;
  /** subTitle 文字 */
  subTitle: React.ReactNode;
  /** title 文字 */
  title: React.ReactNode;
  bulkActionList: Array<ButtonProps & { eventName: string; icon: string; text: string }>;
}
/**
 *
 * @param props 组件本身属性
 * @param style 组件样式
 * @returns
 */
const MResult = ({ config }: ComponentType<IConfig>, ref: any) => {
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
    };
  });

  const iconsList: { [key: string]: any } = icons;
  const bulkActionList = config.props.bulkActionList || [];

  const handleOperate = (eventName: string) => {
    const btnEvent = config.events.find((event) => event.eventName === eventName);
    handleActionFlow(btnEvent?.actions, {});
  };

  return (
    visible && (
      <Result
        style={config.style}
        {...config.props}
        icon={config.props.icon ? React.createElement(iconsList[config.props.icon as string]) : undefined}
        extra={
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 10 }}>
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
      ></Result>
    )
  );
};
export default forwardRef(MResult);
