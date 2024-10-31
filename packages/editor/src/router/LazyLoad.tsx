import { Suspense } from 'react';
import SpinLoading from '@/components/SpinLoading';
/**
 * 组件懒加载，结合Suspense实现
 * @param Component 组件对象
 * @returns 返回新组件
 */
export const lazyLoad = (Component: React.FC, isEditor?: boolean): React.ReactNode => {
  return (
    <Suspense fallback={isEditor ? <SpinLoading size="large" /> : null}>
      <Component />
    </Suspense>
  );
};
