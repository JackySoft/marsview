import { useState, useEffect, useImperativeHandle, forwardRef } from 'react';
import { Typography } from 'antd';
import dayjs from 'dayjs';
import { ComponentType } from '@/packages/types';
import { formatNumber, handleFormatter } from '@/packages/utils/util';
import { omit } from 'lodash-es';
/**
 *
 * @param props 组件本身属性
 * @param style 组件样式
 * @returns
 */
const MTitle = ({ id, type, config }: ComponentType, ref: any) => {
  const [text, setText] = useState('');
  const [visible, setVisible] = useState(true);
  useEffect(() => {
    const originText = config.props?.text?.toString() || '';
    const format = config.props?.format;
    const script = config.props?.script;
    let value: string | number = originText;
    if (format === 'YYYY-MM-DD HH:mm:ss') {
      value = dayjs(originText).format(format);
    } else if (format === 'YYYY-MM-DD') {
      value = dayjs(originText).format(format);
    } else if (format === 'HH:mm:ss') {
      value = dayjs(originText).format(format);
    } else if (format === 'money') {
      value = formatNumber(originText, 'currency');
    } else if (format === 'number') {
      value = formatNumber(originText, 'decimal');
    } else if (format === 'percent') {
      value = formatNumber(originText, 'percent');
    }
    const renderText = handleFormatter(script)?.(value);
    setText(renderText?.toString() || value);
  }, [config.props.text, config.props?.format, config.props?.script]);

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
  return (
    visible && (
      <Typography.Title style={config.style} {...omit(config.props, ['script', 'text'])} data-id={id} data-type={type}>
        {text}
      </Typography.Title>
    )
  );
};
export default forwardRef(MTitle);
