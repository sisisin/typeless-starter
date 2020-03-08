import loadable from '@loadable/component';
import { useRouter } from 'app/hooks/useRouter';
import { appHistory } from 'app/services/appHistory';
import React from 'react';
import { Redirect, Route, RouteProps, Router, Switch } from 'react-router-dom';
import { HeaderMenu } from './HeaderMenu';

const auth = new (class {
  isLoggedIn = false;
  login = () => {
    this.isLoggedIn = true;
  };
  logout = () => {
    this.isLoggedIn = false;
  };
})();
const SampleModule = loadable(() => import('app/features/sample/module'));

type AppRouteProps = {
  path: string | string[];
  children: React.ReactNode;
  requiresAuth: boolean;
};

const defineAppRoute = ({ requiresAuth, path, children }: AppRouteProps, key: string | number) => {
  const base: RouteProps & { key: string | number } = { key, exact: true, sensitive: true, path };
  if (requiresAuth) {
    return (
      <Route
        {...base}
        render={() => (auth.isLoggedIn ? children : <Redirect key={key} to="/login"></Redirect>)}
      ></Route>
    );
  } else {
    return <Route {...base}>{children}</Route>;
  }
};

const routes: AppRouteProps[] = [
  { path: '/sample', requiresAuth: true, children: <SampleModule></SampleModule> },
  { path: '/sample/:id', requiresAuth: true, children: <SampleModule></SampleModule> },
  { path: '/login', requiresAuth: false, children: <Login></Login> },
  {
    path: '/authed',
    requiresAuth: true,
    children: <div>ok!</div>,
  },
];
export const AppRoutes: React.FC = (props) => {
  return (
    <Router history={(appHistory as any).history}>
      <HeaderMenu></HeaderMenu>
      <Switch>
        {routes.map(defineAppRoute)}
        <Route path="*">not found...</Route>
      </Switch>
    </Router>
  );
};
function Login() {
  const h = useRouter().history;
  return (
    <div>
      <div>login!</div>
      <button
        onClick={() => {
          auth.login();
          h.push('/authed');
        }}
      >
        submit
      </button>
    </div>
  );
}
