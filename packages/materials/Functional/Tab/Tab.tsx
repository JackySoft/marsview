import { forwardRef, useImperativeHandle, useState } from 'react';
import { ComponentType } from '@materials/types';
import MarsRender from '@materials/MarsRender/MarsRender';

/**
 *
 * @param props 组件本身属性
 * @param style 组件样式
 * @returns
 */
const MTab = ({ config, elements }: ComponentType, ref: any) => {
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
      <div style={config.style}>
        <MarsRender elements={elements} />
      </div>
    )
  );
};
export default forwardRef(MTab);
