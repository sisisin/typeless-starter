import loadable, { LoadableComponent } from '@loadable/component';
import { useIsLoggedIn } from 'app/features/session/selector';
import React from 'react';
import { Redirect, Route, RouteProps, Switch } from 'react-router-dom';
import { HeaderMenu } from './HeaderMenu';

type AppRouteProps = {
  readonly path: string | string[];
  readonly requiresAuth: boolean;
  readonly Component: LoadableComponent<unknown>;
};

export const routes = [
  {
    path: '/sample',
    requiresAuth: true,
    Component: loadable(() =>
      import('app/features/sample/module').then((m) => ({ default: m.SampleModule })),
    ) as LoadableComponent<unknown>,
  },
  {
    path: '/sample/:id',
    requiresAuth: true,
    Component: loadable(() =>
      import('app/features/sample/module').then((m) => ({ default: m.SampleModule })),
    ) as LoadableComponent<unknown>,
  },
  {
    path: '/login',
    requiresAuth: false,
    Component: loadable(() =>
      import('app/features/login/module').then((m) => ({ default: m.LoginModule })),
    ) as LoadableComponent<unknown>,
  },
] as const;
type RouteDefinitions = typeof routes;
export type AppRoutePaths = RouteDefinitions[number]['path'];

type ValidateRouteDefinitions = RouteDefinitions extends readonly AppRouteProps[] ? true : never;

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const x: ValidateRouteDefinitions = true;

export const AppRoutes: React.FC = () => {
  const isLoggedIn = useIsLoggedIn();
  return (
    <>
      <HeaderMenu></HeaderMenu>
      <Switch>
        {routes.map(({ requiresAuth, path, Component }, key) => {
          const base: RouteProps & { key: React.Key } = { key, exact: true, sensitive: true, path };

          if (requiresAuth) {
            return (
              <Route
                {...base}
                render={() => (isLoggedIn ? <Component></Component> : <Redirect to="/login"></Redirect>)}
              ></Route>
            );
          } else {
            return <Route {...base} component={Component}></Route>;
          }
        })}
        <Route path="*">not found...</Route>
      </Switch>
    </>
  );
};
