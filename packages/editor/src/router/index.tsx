import React from 'react';
import { createBrowserRouter, Navigate } from 'react-router-dom';
import { lazyLoad } from './LazyLoad';
import AuthLoader from './AuthLoader';
import Root from './Root';
import ErrorBoundary from './ErrorBoundary';

/**
 * 定义页面路由
 */
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
    path: '/password-reset',
    element: lazyLoad(React.lazy(() => import('@/pages/login/Reset'))),
  },
  {
    path: '/',
    loader: AuthLoader,
    element: <Root />,
    errorElement: <ErrorBoundary />,
    children: [
      {
        path: '/projects',
        element: lazyLoad(React.lazy(() => import('@/pages/home/project/index'))),
      },
      {
        path: '/project/pages',
        element: lazyLoad(React.lazy(() => import('@/pages/home/project/Pages'))),
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
        path: '/workflows',
        element: lazyLoad(React.lazy(() => import('@/pages/home/workflow/WorkFlowList'))),
      },
      {
        path: '/workflow/:id',
        element: lazyLoad(React.lazy(() => import('@/pages/home/workflow/Design'))),
      },
      {
        path: '/lib/:id',
        element: lazyLoad(React.lazy(() => import('@/pages/home/lib/LibEditor'))),
      },
      {
        path: '/editor/:id',
        element: lazyLoad(React.lazy(() => import('@/layout/EditLayout'))),
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
        path: '/feedback',
        element: lazyLoad(React.lazy(() => import('@/pages/feedback'))),
      },
      {
        path: '/feedback/:id/detail',
        element: lazyLoad(React.lazy(() => import('@/pages/feedback/IssueDetail'))),
      },
      {
        path: '/feedback/post',
        element: lazyLoad(React.lazy(() => import('@/pages/feedback/IssuePost'))),
      },
      {
        path: '/user/profile',
        element: lazyLoad(React.lazy(() => import('@/pages/user'))),
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
