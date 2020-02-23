import { createModule } from 'typeless';
import { RouterSymbol } from './symbol';
import { Route, URLDescriptor } from 'navi';

// --- Actions ---
export const [handle, RouterActions, getRouterState] = createModule(RouterSymbol)
  .withActions({
    $mounted: null,
    $unmounted: null,
    $remounted: null,
    routeChanged: (route: Route) => ({ payload: { route } }),
  })
  .withState<RouterState>();

// --- Types ---
export interface RouterState {
  title: string;
  url: URLDescriptor;
  params: { [key: string]: string };
}
