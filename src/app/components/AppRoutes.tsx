import loadable, { LoadableComponent } from '@loadable/component';
import { useIsLoggedIn } from 'app/features/session/selector';
import React from 'react';
import { Redirect, Route, RouteProps, Switch } from 'react-router-dom';
import { HeaderMenu } from './HeaderMenu';
import { useRouter } from 'app/hooks/useRouter';

type AppRouteProps = {
  readonly path: string | readonly string[];
  readonly requiresAuth: boolean;
  readonly Component: LoadableComponent<unknown>;
};

export const routes = [
  {
    path: ['/', '/sample'],
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
type ToPathUnionType<T extends [] | readonly [AppRouteProps, ...AppRouteProps[]]> = {
  [P in keyof T]: T[P] extends { path: infer U } ? (U extends readonly string[] ? U[number] : U) : never;
}[number];
export type AppRoutePaths = ToPathUnionType<RouteDefinitions>;

type ValidateRouteDefinitions = RouteDefinitions extends readonly AppRouteProps[] ? true : never;

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const x: ValidateRouteDefinitions = true;

const RedirectToLogin: React.FC = () => {
  const { location } = useRouter();

  const from = encodeURIComponent(location.pathAfter);
  const login = `/login?${new URLSearchParams({ from }).toString()}`;
  return <Redirect to={login}></Redirect>;
};
export const AppRoutes: React.FC = () => {
  const isLoggedIn = useIsLoggedIn();

  return (
    <>
      <HeaderMenu></HeaderMenu>
      <Switch>
        {routes.map(({ requiresAuth, path, Component }, key) => {
          const base: RouteProps & { key: React.Key } = {
            key,
            exact: true,
            sensitive: true,
            path: path as string | string[],
          };

          if (requiresAuth) {
            return (
              <Route
                {...base}
                render={() => (isLoggedIn ? <Component></Component> : <RedirectToLogin></RedirectToLogin>)}
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
