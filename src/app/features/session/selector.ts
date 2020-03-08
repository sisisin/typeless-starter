import { createSelector, useSelector } from 'typeless';
import { getSessionState } from './interface';

export const getIsLoggedIn = createSelector([getSessionState, (state) => state.user], (user) => user !== undefined);
export const useIsLoggedIn = () => useSelector(getIsLoggedIn);
