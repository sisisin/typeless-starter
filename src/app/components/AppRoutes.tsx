import React from 'react';
import { Redirect, Route, RouteProps, Switch, useRouteMatch } from 'react-router-dom';
import { useActions } from 'typeless';
import { HeaderMenu } from './HeaderMenu';
import { useIsLoggedIn } from 'app/features/session/selector';
import { useRouter } from 'app/hooks/useRouter';
import { appRouteDefinitions } from 'app/types/AppRouteDefinitions';
import { AuthGuardType } from 'app/types/AuthGuardType';
import { assertNever } from 'app/types/typeAssertions';
import { RouterModule } from 'app/features/router/module';
import { RouterActions } from 'app/features/router/interface';

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
const R: React.FC = ({ children }) => {
  const { params } = useRouteMatch();
  const { routeChanged } = useActions(RouterActions);
  React.useEffect(() => {
    routeChanged(params);
  });
  return <>{children}</>;
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
              <R>
                <AuthGuard authGuardType={authGuardType}>
                  <Component></Component>
                </AuthGuard>
              </R>
            </Route>
          );
        })}
        <Route path="*">not found...</Route>
      </Switch>
    </>
  );
};
