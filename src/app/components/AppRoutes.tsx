import { useIsLoggedIn } from 'app/features/session/selector';
import React from 'react';
import { Redirect, Route, RouteProps, Switch } from 'react-router-dom';
import { HeaderMenu } from './HeaderMenu';
import { useRouter } from 'app/hooks/useRouter';
import { appRouteDefinitions } from 'app/types/AppRouteDefinitions';

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
        {Object.values(appRouteDefinitions).map(({ requiresAuth, path, Component }, key) => {
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
