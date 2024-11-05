import React, { useState, useEffect, useImperativeHandle, forwardRef } from 'react';
import { Statistic } from 'antd';
import { ComponentType } from '@materials/types';
import * as icons from '@ant-design/icons';
import { message } from '@materials/utils/AntdGlobal';
import { omit } from 'lodash-es';
/**
 *
 * @param props 组件本身属性
 * @param style 组件样式
 * @returns
 */
const CountDown = ({ config, onChange, onFinish }: ComponentType, ref: any) => {
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
    let value: string | number = originText;

    if (script) {
      try {
        const renderFn = new Function('value', `return (${script})(value);`);
        value = renderFn(value);
      } catch (error) {
        console.error(`脚本解析失败`, error);
        message.error(JSON.stringify(error));
      }
    }
    setText(Number(value?.toString()));
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
      />
    )
  );
};
export default forwardRef(CountDown);
