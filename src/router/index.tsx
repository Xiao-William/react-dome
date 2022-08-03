import React, { lazy, Suspense } from 'react';
import { Navigate } from 'react-router-dom';
import Main from '../views/Main';
import { RouteObject } from './types';

const LazyWrapper = (path: string) => {
  const Component = lazy(() => import(`../views${path}`));
  return (
    <Suspense fallback={null}>
      <Component />
    </Suspense>
  );
};

const routes: RouteObject[] = [
  {
    path: '/',
    element: <Navigate to="/main" />
  },
  {
    path: '/main',
    element: <Main />,
    children: [

    ]
  },
  {
    path: '/login',
    element: LazyWrapper('/login')
  },

  {
    path: '*',
    element: LazyWrapper('/not-found')
  }
];

export { routes };
