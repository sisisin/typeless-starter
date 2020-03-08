import loadable from '@loadable/component';
import { appHistory } from 'app/services/appHistory';
import React from 'react';
import { Redirect, Route, RouteProps, Router, Switch } from 'react-router-dom';
import { HeaderMenu } from './HeaderMenu';
import { useIsLoggedIn } from 'app/features/session/selector';

const SampleModule = loadable(() => import('app/features/sample/module'));
const LoginModule = loadable(() => import('app/features/login/module'));

type AppRouteProps = {
  path: string | string[];
  children: React.ReactNode;
  requiresAuth: boolean;
};

const routes: AppRouteProps[] = [
  { path: '/sample', requiresAuth: true, children: <SampleModule></SampleModule> },
  { path: '/sample/:id', requiresAuth: true, children: <SampleModule></SampleModule> },
  { path: '/login', requiresAuth: false, children: <LoginModule></LoginModule> },
  {
    path: '/authed',
    requiresAuth: true,
    children: <div>ok!!</div>,
  },
];

const useRouteDefinitions = () => {
  const isLoggedIn = useIsLoggedIn();

  return routes.map(({ requiresAuth, path, children }, key) => {
    const base: RouteProps & { key: string | number } = { key, exact: true, sensitive: true, path };

    if (requiresAuth) {
      return (
        <Route {...base} render={() => (isLoggedIn ? children : <Redirect key={key} to="/login"></Redirect>)}></Route>
      );
    } else {
      return <Route {...base}>{children}</Route>;
    }
  });
};

export const AppRoutes: React.FC = (props) => {
  return (
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    <Router history={(appHistory as any).history}>
      <HeaderMenu></HeaderMenu>
      <Switch>
        {useRouteDefinitions()}
        <Route path="*">not found...</Route>
      </Switch>
    </Router>
  );
};
