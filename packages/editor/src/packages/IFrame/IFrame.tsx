import { ComponentType } from '@/packages/types';
import { useState, useImperativeHandle, forwardRef, useMemo } from 'react';

/**
 *
 * @param props 组件本身属性
 * @param style 组件样式
 * @returns
 */
const IFrame = ({ id, type, config }: ComponentType, ref: any) => {
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
    // TODO: 临时兼容老版本，后续需要删除
    const { top } = config.props.clip || { top: '0px' };
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
      <div style={config.style} data-id={id} data-type={type}>
        <iframe
          style={{ position: 'absolute', top: config.props.clip?.top || 0, left: 0, width: '100%', height, border: 'none' }}
          {...config.props}
        ></iframe>
      </div>
    )
  );
};
export default forwardRef(IFrame);
