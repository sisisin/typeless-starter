import loadable, { LoadableComponent } from '@loadable/component';
import { useIsLoggedIn } from 'app/features/session/selector';
import React from 'react';
import { Redirect, Route, RouteProps, Switch } from 'react-router-dom';
import { HeaderMenu } from './HeaderMenu';

const SampleModule = loadable(() => import('app/features/sample/module'));
const LoginModule = loadable(() => import('app/features/login/module'));

type Base = {
  path: string | string[];
  requiresAuth: boolean;
};
type AppRouteProps = Base & {
  Component: React.ComponentType;
};
type AppLazyRouteProps = Base & {
  Component: LoadableComponent<unknown>;
};

export const lazyRoutes: AppLazyRouteProps[] = [
  { path: '/sample', requiresAuth: true, Component: SampleModule },
  { path: '/sample/:id', requiresAuth: true, Component: SampleModule },
  { path: '/login', requiresAuth: false, Component: LoginModule },
];
const routes: AppRouteProps[] = [
  {
    path: '/authed',
    requiresAuth: true,
    Component: () => <div>ok!</div>,
  },
];

const useRouteDefinitions = () => {
  const isLoggedIn = useIsLoggedIn();

  return routes.concat(lazyRoutes).map(({ requiresAuth, path, Component }, key) => {
    const base: RouteProps & { key: React.Key } = { key, exact: true, sensitive: true, path };

    if (requiresAuth) {
      return (
        <Route
          {...base}
          render={() => (isLoggedIn ? <Component></Component> : <Redirect key={key} to="/login"></Redirect>)}
        ></Route>
      );
    } else {
      return <Route {...base} component={Component}></Route>;
    }
  });
};

export const AppRoutes: React.FC = () => {
  return (
    <>
      <HeaderMenu></HeaderMenu>
      <Switch>
        {useRouteDefinitions()}
        <Route path="*">not found...</Route>
      </Switch>
    </>
  );
};
