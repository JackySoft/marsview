import { ComponentType } from '../types';
import { useState, useImperativeHandle, forwardRef, useMemo } from 'react';

/**
 *
 * @param props 组件本身属性
 * @param style 组件样式
 * @returns
 */
const IFrame = ({ config }: ComponentType, ref: any) => {
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
  // 裁剪后，重新计算高度
  const height = useMemo(() => {
    const { top } = config.props.clip;
    let height = '100%';
    const px = (num: string) => Number(num.replace('px', ''));
    const topPx = px(top);
    if (topPx != 0) {
      height = `calc(100% + ${-topPx}px)`;
    }
    return height;
  }, [config.props.clip]);
  return (
    visible && (
      <div style={config.style}>
        <iframe
          style={{ position: 'absolute', top: config.props.clip.top, left: 0, width: '100%', height, border: 'none' }}
          {...config.props}
        ></iframe>
      </div>
    )
  );
};
export default forwardRef(IFrame);
