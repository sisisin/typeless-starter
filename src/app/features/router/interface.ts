import { createModule, createSelector, useSelector } from 'typeless';
import { RouterSymbol } from './symbol';
import { AppPaths, GetParamsFromPath } from 'app/types/AppRouteDefinitions';

// --- Actions ---
const modules = createModule(RouterSymbol)
  .withActions({
    routeChanged: (params: Record<string, string>) => ({ payload: { params } }),
  })
  .withState<RouterState>();
export const [handle, RouterActions] = modules;

const selector = createSelector([modules[2], (s) => s.params], (params) => {
  return params;
});

// note: It is needed function's argument for better type inference
export const getAppParams = <T extends AppPaths>(_: T) => selector() as GetParamsFromPath<T>;
export const useAppParams = <T extends AppPaths>(_: T) => useSelector(selector) as GetParamsFromPath<T>;

// --- Types ---
export interface RouterState {
  params: Record<string, string>;
}
