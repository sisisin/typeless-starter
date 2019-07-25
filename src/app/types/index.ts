import { Matcher } from 'navi';

export interface RouteConfig {
  type: 'route';
  path: string;
  exact?: boolean;
  auth: boolean;
  component: React.ReactElement<any>;
}

export interface RouteEntry {
  path: string;
  routes: Matcher<any, any>;
}
