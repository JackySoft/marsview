import { Suspense } from 'react';
import { Spin } from 'antd';
/**
 * 组件懒加载，结合Suspense实现
 * @param Component 组件对象
 * @returns 返回新组件
 */
export const lazyLoad = (Component: React.FC, isEditor?: boolean): React.ReactNode => {
  // 编辑器组件由于比较慢，增加一个Loading效果
  return (
    <Suspense
      fallback={isEditor ? <Spin size="large" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', marginTop: 30 }} /> : null}
    >
      <Component />
    </Suspense>
  );
};
