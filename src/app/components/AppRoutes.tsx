import loadable from '@loadable/component';
import { SessionActions } from 'app/features/session/interface';
import { appHistory } from 'app/services/appHistory';
import React from 'react';
import { Redirect, Route, RouteProps, Router, Switch } from 'react-router-dom';
import { useActions } from 'typeless';
import { HeaderMenu } from './HeaderMenu';
import { useIsLoggedIn } from 'app/features/session/selector';

const SampleModule = loadable(() => import('app/features/sample/module'));

type AppRouteProps = {
  path: string | string[];
  children: React.ReactNode;
  requiresAuth: boolean;
};

const routes: AppRouteProps[] = [
  { path: '/sample', requiresAuth: true, children: <SampleModule></SampleModule> },
  { path: '/sample/:id', requiresAuth: true, children: <SampleModule></SampleModule> },
  { path: '/login', requiresAuth: false, children: <Login></Login> },
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
    <Router history={(appHistory as any).history}>
      <HeaderMenu></HeaderMenu>
      <Switch>
        {useRouteDefinitions()}
        <Route path="*">not found...</Route>
      </Switch>
    </Router>
  );
};
function Login() {
  const { loginSucceeded } = useActions(SessionActions);
  return (
    <div>
      <div>login!</div>
      <button onClick={() => loginSucceeded({ name: 'hoge' })}>submit</button>
    </div>
  );
}
