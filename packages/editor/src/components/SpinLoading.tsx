import { Spin } from 'antd';
import { memo } from 'react';

/**
 * 用于组件懒加载时显示Loading效果
 * @param size 尺寸
 * @returns 返回Loading组件
 */
function SpinLoading({ size = 'default' }: { size?: 'default' | 'small' | 'large' }) {
  return <Spin size={size} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', marginTop: 30 }} />;
}
export default memo(SpinLoading);
