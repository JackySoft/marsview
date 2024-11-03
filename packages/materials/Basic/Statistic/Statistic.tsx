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
const MStatistic = ({ config }: ComponentType, ref: any) => {
  const [text, setText] = useState('');
  const [visible, setVisible] = useState(true);

  useEffect(() => {
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
    setText(value?.toString());
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
      <Statistic
        style={config.style}
        {...omit(config.props, ['script', 'prefix', 'suffix'])}
        value={text}
        prefix={config.props.prefix ? React.createElement(iconsList[config.props.prefix]) : null}
        suffix={config.props.suffix ? React.createElement(iconsList[config.props.suffix]) : null}
      />
    )
  );
};
export default forwardRef(MStatistic);
