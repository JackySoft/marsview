import { ComponentType } from '@/packages/types';
import { Divider } from 'antd';
import { forwardRef, useImperativeHandle, useState } from 'react';

/*泛型只需要定义组件本身用到的属性*/
export interface IConfig {
  text: string;
}
/**
 *
 * @param props 组件本身属性
 * @param style 组件样式
 * @returns
 */
const MDevider = ({ id, type, config }: ComponentType<IConfig>, ref: any) => {
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

  return (
    visible && (
      <Divider style={config.style} {...config.props} data-id={id} data-type={type}>
        {config.props.text}
      </Divider>
    )
  );
};
export default forwardRef(MDevider);
