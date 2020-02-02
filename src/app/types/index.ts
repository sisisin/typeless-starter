import { Matcher } from 'navi';

export interface RouteEntry {
  path: string;
  routes: Matcher<object, object>;
}
