import { useIsLoggedIn } from 'app/features/session/selector';
import React from 'react';
import { Redirect, Route, RouteProps, Switch } from 'react-router-dom';
import { HeaderMenu } from './HeaderMenu';
import { useRouter } from 'app/hooks/useRouter';
import { appRouteDefinitions } from 'app/types/AppRouteDefinitions';
import { AuthGuardType } from 'app/types/AuthGuardType';
import { assertNever } from 'app/types/typeAssertions';

const AuthGuard: React.FC<{ authGuardType: AuthGuardType }> = ({ authGuardType, children }) => {
  const isLoggedIn = useIsLoggedIn();
  const { location } = useRouter();

  switch (authGuardType) {
    case 'public': {
      return <>{children}</>;
    }
    case 'publicWithRedirectIfLoggedIn': {
      const from = location.searchParams.get('from');
      const to = from === null ? '/' : decodeURIComponent(from);
      return isLoggedIn ? <Redirect to={to}></Redirect> : <>{children}</>;
    }
    case 'private': {
      const to = `/login?${new URLSearchParams({ from: location.pathAfter }).toString()}`;
      return isLoggedIn ? <>{children}</> : <Redirect to={to}></Redirect>;
    }
    default:
      return assertNever(authGuardType);
  }
};

export const AppRoutes: React.FC = () => {
  return (
    <>
      <HeaderMenu></HeaderMenu>
      <Switch>
        {Object.values(appRouteDefinitions).map(({ authGuardType, path, Component }, key) => {
          const base: RouteProps & { key: React.Key } = {
            key,
            exact: true,
            sensitive: true,
            path: path as string | string[],
          };

          return (
            <Route {...base}>
              <AuthGuard authGuardType={authGuardType}>
                <Component></Component>
              </AuthGuard>
            </Route>
          );
        })}
        <Route path="*">not found...</Route>
      </Switch>
    </>
  );
};
