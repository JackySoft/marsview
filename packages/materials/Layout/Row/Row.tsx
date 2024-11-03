import { ComponentType } from '@materials/types';
import MarsRender from '@materials/MarsRender/MarsRender';
import { forwardRef, useImperativeHandle, useState } from 'react';
import { Row } from 'antd';

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
const MRow = ({ id, type, config, elements }: ComponentType, ref: any) => {
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
  const gutter = config.props?.gutter || 0;
  return (
    visible && (
      <Row style={config.style} {...config.props} gutter={gutter}>
        <MarsRender elements={elements} />
      </Row>
    )
  );
};
export default forwardRef(MRow);
