import { Form, InputProps, FormItemProps } from 'antd';
import { forwardRef, useImperativeHandle, useState } from 'react';
import { ComponentType } from '@materials/types';

import MarsRender from '@materials/MarsRender/MarsRender';

/* 泛型只需要定义组件本身用到的属性，当然也可以不定义，默认为any */
export interface IConfig {
  defaultValue: string;
  formItem: FormItemProps;
  formWrap: InputProps;
}
/**
 *
 * @param config 组件配置属性值
 * @param props 系统属性值：componentid、componentname等
 * @returns 返回组件
 */
const MFormItem = ({ id, type, config, elements }: ComponentType<IConfig>, ref: any) => {
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
  const ItemProps = config.props.formItem;
  return (
    visible && (
      <Form.Item {...ItemProps} name={ItemProps.name || undefined} data-id={id} data-type={type}>
        <span style={config.style}>{<MarsRender elements={elements || []} />}</span>
      </Form.Item>
    )
  );
};

export default forwardRef(MFormItem);
