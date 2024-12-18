import { useState, useEffect, useImperativeHandle, forwardRef } from 'react';
import { Typography } from 'antd';
import dayjs from 'dayjs';
import { ComponentType } from '../../types';
import { formatNumber } from '../../utils/util';
import { message } from '../../utils/AntdGlobal';
import { omit } from 'lodash-es';
/**
 *
 * @param props 组件本身属性
 * @param style 组件样式
 * @returns
 */
const MText = ({ config, onClick }: ComponentType, ref: any) => {
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
  }, [config.props.text]);

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
  const handleClick = () => {
    onClick?.();
  };
  return (
    visible && (
      <Typography.Text style={config.style} {...omit(config.props, ['script', 'text'])} onClick={handleClick}>
        {text}
      </Typography.Text>
    )
  );
};
export default forwardRef(MText);
