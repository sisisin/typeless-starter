import { RouteEntry } from 'app/types';
import { lazy } from 'navi';

// --- Routing ---
export const routeEntry: RouteEntry = {
  path: '/sample',
  routes: lazy(() => import('./module')),
};
