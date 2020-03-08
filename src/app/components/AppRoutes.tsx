import React from 'react';
import { BrowserRouter as Router, Link, Route, Switch, generatePath, Redirect, RouteProps } from 'react-router-dom';
import { useRouter } from 'app/hooks/useRouter';
import loadable from '@loadable/component';

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

type AppRouteProps = Omit<RouteProps, 'exact' | 'sensitive' | 'strict' | 'location'> & {
  path: string | string[];
};

const AppRoute: React.FC<AppRouteProps> = ({ children, ...rest }) => (
  <Route {...rest} exact sensitive children={children}></Route>
);
const PublicRoute: React.FC<AppRouteProps> = ({ children, ...rest }) => {
  return <AppRoute {...rest} children={children}></AppRoute>;
};

const Menu = () => {
  return (
    <>
      <div>
        <Link to="/x">x</Link>
      </div>
      <div>
        <Link to="/x/1">x1</Link>
      </div>
      <div>
        <Link to={{ pathname: '/n' }}>nested</Link>
      </div>
      <div>
        <Link to={{ pathname: '/login' }}>login page</Link>
      </div>
      <div>
        <Link to={{ pathname: '/authed' }}>authed</Link>
      </div>
      <div>
        <Link to="/no_matched">no_matched</Link>
      </div>
      <hr></hr>
    </>
  );
};
export const AppRoutes: React.FC = () => {
  return (
    <Router>
      <Menu></Menu>
      <Switch>
        <AppRoute path="/sample">
          <SampleModule></SampleModule>
        </AppRoute>
        <Route exact path="/x">
          <div>x</div>
        </Route>
        <Route path="/x/:id">
          <L>
            <div>xid</div>
          </L>
        </Route>
        <Route path="/n">
          <Nested></Nested>
        </Route>
        <Route path="/login">
          <Authed></Authed>
        </Route>
        <Route
          path="/authed"
          render={(p) => {
            return auth.isLoggedIn ? <div>ok!</div> : <Redirect to="/login"></Redirect>;
          }}
        ></Route>
        <Route path="*">not found...</Route>
      </Switch>
    </Router>
  );
};
function Authed() {
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
function Nested() {
  const h = useRouter().history;

  return (
    <div>
      <button
        onClick={() => {
          const to = generatePath('/x', {});
          console.log(to);
          h.push(to);
        }}
      >
        push
      </button>
      <div>nested</div>
    </div>
  );
}
function L(props: any) {
  useRouter();

  return props.children;
}
