import React from 'react';
import { useActions } from 'typeless';
// eslint-disable-next-line no-restricted-imports
import { useRouteMatch } from 'react-router-dom';
import { RouterActions, RouterState, handle } from './interface';

// --- Reducer ---
const initialState: RouterState = {
  params: {},
};

export const reducer = handle.reducer(initialState).on(RouterActions.routeChanged, (state, { params }) => {
  state.params = params;
});

// --- Module ---
export const useRouterModule = handle;
export const RouterModule: React.FC = ({ children }) => {
  useRouterModule();
  const { params } = useRouteMatch();
  const { routeChanged } = useActions(RouterActions);
  routeChanged(params);
  return <>{children}</>;
};
