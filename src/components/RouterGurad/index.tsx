import { RouteObject } from '../../router/types';
import { useLocation, useRoutes } from 'react-router-dom';
import React, { useEffect } from 'react';

interface Props {
  routes: RouteObject[];
}
// 导航守卫组件
const RouterGurad: React.FC<Props> = ({ routes }) => {
  const Route = useRoutes(routes);
  const { pathname } = useLocation();
  useEffect(() => {
  }, [pathname]);
  return <>{Route}</>;
};

export default RouterGurad;
