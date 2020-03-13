import loadable, { LoadableComponent } from '@loadable/component';
import { useIsLoggedIn } from 'app/features/session/selector';
import React from 'react';
import { Redirect, Route, RouteProps, Switch } from 'react-router-dom';
import { HeaderMenu } from './HeaderMenu';
import { useRouter } from 'app/hooks/useRouter';

type AppRouteProps = {
  [key: string]: {
    readonly path: string | readonly string[];
    readonly params?: readonly string[];
    readonly queryParams?: readonly string[];
    readonly requiresAuth: boolean;
    readonly Component: LoadableComponent<unknown>;
  };
};

export const routes = {
  home: {
    path: ['/', '/sample'],
    requiresAuth: true,
    Component: loadable(() =>
      import('app/features/sample/module').then((m) => ({ default: m.SampleModule })),
    ) as LoadableComponent<unknown>,
  },
  sampleWithId: {
    path: '/sample/:id',
    params: ['id'],
    requiresAuth: true,
    Component: loadable(() =>
      import('app/features/sample/module').then((m) => ({ default: m.SampleModule })),
    ) as LoadableComponent<unknown>,
  },
  login: {
    path: '/login',
    queryParams: ['from'],
    requiresAuth: false,
    Component: loadable(() =>
      import('app/features/login/module').then((m) => ({ default: m.LoginModule })),
    ) as LoadableComponent<unknown>,
  },
} as const;

type RouteDefinitions = typeof routes;
export type AppRoutePaths = {
  [K in keyof RouteDefinitions]: Merge<
    { path: ToUnion<RouteDefinitions[K]['path']> },
    RouteDefinitions[K] extends { params: infer V } ? { params: ToStringObject<ToUnion<V>> } : { params?: never },
    RouteDefinitions[K] extends { queryParams: infer W }
      ? { queryParams: Partial<ToStringObject<ToUnion<W>>> }
      : { queryParams?: never }
  >;
};
type Merge<T extends object, U extends object, V extends object> = { [K in keyof T]: T[K] } &
  { [K in keyof U]: U[K] } &
  { [K in keyof V]: V[K] };

type ToUnion<T> = T extends readonly string[] ? T[number] : T;
type ToStringObject<T> = T extends string ? { [P in T]: string } : never;

type ValidateRouteDefinitions = RouteDefinitions extends AppRouteProps ? true : never;

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
        {Object.values(routes).map(({ requiresAuth, path, Component }, key) => {
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
