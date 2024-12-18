import { Form, InputProps, FormItemProps, Image } from 'antd';
import { forwardRef, useEffect, useImperativeHandle, useState } from 'react';
import { ComponentType } from '@materials/types';
import dayjs from 'dayjs';
import { formatNumber, isNull } from '@materials/utils/util';
import { useFormContext } from '@materials/utils/context';
import { message } from '@materials/utils/AntdGlobal';

export interface IConfig {
  defaultValue: string;
  formItem: FormItemProps;
  formWrap: InputProps;
}

const StaticItem = ({ config }: ComponentType<IConfig>, ref: any) => {
  const { form, formId, setFormData } = useFormContext();
  const [visible, setVisible] = useState(true);
  // 初始化默认值
  useEffect(() => {
    const name: string = config.props.formItem?.name;
    const value = config.props.defaultValue;
    // 日期组件初始化值
    if (name && !isNull(value)) {
      form?.setFieldValue(name, value);
      setFormData({ name: formId, value: { [name]: value } });
    }
  }, [config.props.defaultValue]);

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
      <Form.Item {...config.props.formItem}>
        <Label {...config.props.formWrap} name={config.props.formItem.name} style={config.style} />
      </Form.Item>
    )
  );
};

// 静态文本，根据配置动态渲染各项能力
const Label = (props: any) => {
  const originValue = props.value || '';
  let value = originValue;
  if (isNull(originValue)) {
    // 开发模式下显示变量名称，生产模式下，需要改成{props.emptyType}
    return <span style={props.style}>{props.emptyType}</span>;
  }
  if (props.showType === 'text') {
    // 格式化日期
    if (props.dateType) {
      value = dayjs(originValue).format(props.dateType);
    }
    // 数字格式化
    if (props.numberType) {
      value = formatNumber(originValue, props.numberType);
    }
    // 如果是dayjs对象，需要转换
    if (originValue?.format) {
      value = dayjs(originValue).format();
    }
  }
  if (props.script) {
    try {
      const renderFn = new Function('value', `return (${props.script})(value);`);
      value = renderFn(value);
    } catch (error) {
      console.error(`脚本解析失败`, error);
      message.error(JSON.stringify(error));
    }
  }
  value = value?.toString();
  if (props.showType === 'text') {
    return <span style={props.style}>{value}</span>;
  }
  if (props.showType === 'href') {
    return (
      <a href={value} target="_blank" style={props.style}>
        {value}
      </a>
    );
  }
  if (props.showType === 'image') {
    return <Image src={value} style={props.style} />;
  }
};
export default forwardRef(StaticItem);
