import React, { useState, useEffect, useImperativeHandle, forwardRef } from 'react';
import { Statistic } from 'antd';
import { ComponentType } from '@/packages/types';
import * as icons from '@ant-design/icons';
import { message } from '@/utils/AntdGlobal';
import { omit } from 'lodash-es';
import { handleFormatter } from '@/packages/utils/util';

/**
 *
 * @param props 组件本身属性
 * @param style 组件样式
 * @returns
 */
const CountDown = ({ id, type, config, onChange, onFinish }: ComponentType, ref: any) => {
  const [text, setText] = useState(0);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    if (isNaN(config.props?.value)) {
      console.error('倒计时组件值必须为时间戳类型');
      message.error('倒计时组件值必须为时间戳');
      return;
    }
    const originText = config.props?.value?.toString() || '';
    const script = config.props?.script;
    const renderText = handleFormatter(script)?.(originText);
    setText(Number(renderText?.toString() || originText));
  }, [config.props.value, config.props?.script]);

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
  return (
    visible && (
      <Statistic.Countdown
        style={config.style}
        {...omit(config.props, ['script', 'format', 'prefix', 'suffix'])}
        value={text}
        format={config.props?.format || undefined}
        prefix={config.props.prefix ? React.createElement(iconsList[config.props.prefix]) : null}
        suffix={config.props.suffix ? React.createElement(iconsList[config.props.suffix]) : null}
        onChange={(val) => onChange?.(val)}
        onFinish={() => onFinish?.(text)}
        data-id={id}
        data-type={type}
      />
    )
  );
};
export default forwardRef(CountDown);
