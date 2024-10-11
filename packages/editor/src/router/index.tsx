import React, { useEffect, useMemo, useState } from 'react';
import { createBrowserRouter, Navigate, useRouteError } from 'react-router-dom';
import { Button } from 'antd';
import { lazyLoad } from './LazyLoad';
import AuthLoader from './AuthLoader';
import Root from './Root';
import { usePageStore } from '@/stores/pageStore';

/**
 * 渲染错误边界组件
 */
function ErrorBoundary() {
  const [logId, setLogId] = useState('');
  const error: any = useRouteError();
  const data = useMemo(() => {
    return JSON.stringify(usePageStore.getState().page);
  }, []);
  useEffect(() => {
    const backUpId = 'Key' + Date.now();
    setLogId(backUpId);
    sessionStorage.setItem(backUpId, data);
  }, []);
  return (
    <div style={{ width: '80%', margin: '100px auto' }}>
      <h1>{error.name}：渲染失败，请检查:</h1>
      <h3 style={{ lineHeight: '30px' }}>当前页面数据已为您备份，可通过sessionStorage查找，日志Id：{logId}</h3>
      <p style={{ lineHeight: '30px', color: 'red', marginBottom: 20 }}>{error.stack}</p>
      <Button type="primary" onClick={() => location.reload()}>
        Try again
      </Button>
    </div>
  );
}
export const router = [
  {
    path: '/',
    element: lazyLoad(React.lazy(() => import('@/pages/welcome/Welcome'))),
  },
  {
    path: '/login',
    element: lazyLoad(React.lazy(() => import('@/pages/login/Login'))),
  },
  {
    path: '/demo',
    element: lazyLoad(React.lazy(() => import('@/pages/login/Demo'))),
  },
  {
    path: '/',
    loader: AuthLoader,
    element: <Root />,
    errorElement: <ErrorBoundary />,
    children: [
      {
        path: '/projects',
        element: lazyLoad(React.lazy(() => import('@/pages/home/ProjectList'))),
      },
      {
        path: '/pages',
        element: lazyLoad(React.lazy(() => import('@/pages/home/PageList'))),
      },
      {
        path: '/libs',
        element: lazyLoad(React.lazy(() => import('@/pages/home/LibList'))),
      },
      {
        path: '/templates',
        element: lazyLoad(React.lazy(() => import('@/pages/home/Template'))),
      },
      {
        path: '/lib/:id',
        element: lazyLoad(React.lazy(() => import('@/pages/home/lib/LibEditor'))),
      },
      {
        path: '/editor/:id',
        element: lazyLoad(
          React.lazy(() => import('@/layout/EditLayout')),
          true,
        ),
        children: [
          {
            path: '/editor/:id/edit',
            element: lazyLoad(
              React.lazy(() => import('@/pages/editor/editor')),
              true,
            ),
          },
          {
            path: '/editor/:id/template',
            element: lazyLoad(
              React.lazy(() => import('@/pages/editor/editor')),
              true,
            ),
          },
        ],
      },
      {
        path: '/editor/:id/publishHistory',
        element: lazyLoad(React.lazy(() => import('@/pages/publishHistory'))),
      },
      {
        path: '/project/:id',
        element: lazyLoad(React.lazy(() => import('@/pages/admin/admin'))),
        children: [
          {
            path: '/project/:id/config',
            element: lazyLoad(React.lazy(() => import('@/pages/admin/config/index'))),
          },
          {
            path: '/project/:id/menu',
            element: lazyLoad(React.lazy(() => import('@/pages/admin/menu/index'))),
          },
          {
            path: '/project/:id/role',
            element: lazyLoad(React.lazy(() => import('@/pages/admin/role/index'))),
          },
          {
            path: '/project/:id/user',
            element: lazyLoad(React.lazy(() => import('@/pages/admin/user/index'))),
          },
        ],
      },
      {
        path: '/cloud',
        element: lazyLoad(React.lazy(() => import('@/pages/home/cloud/ImgCloud'))),
      },
      {
        path: '*',
        element: <Navigate to="/404" />,
      },
      {
        path: '/404',
        element: lazyLoad(React.lazy(() => import('@/pages/404'))),
      },
      {
        path: '/403',
        element: lazyLoad(React.lazy(() => import('@/pages/403'))),
      },
    ],
  },
];

export default createBrowserRouter(router);
