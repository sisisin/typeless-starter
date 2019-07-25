import { RouteEntry } from 'app/types';
import { lazy } from 'navi';

// --- Routing ---
export const routeEntry: RouteEntry = {
  path: '/{{dashCase name}}',
  routes: lazy(() => import('./module')),
};
