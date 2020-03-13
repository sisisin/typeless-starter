import { appHistory } from 'app/services/appHistory';
import { handle, SessionActions, SessionState } from './interface';

// --- Epic ---
export const epic = handle.epic().on(SessionActions.loginSucceeded, () => {
  const from = appHistory.location.searchParams.get('from');
  const to = from ? decodeURIComponent(from) : '/';
  appHistory.push(to);
  return null;
});

// --- Reducer ---
const initialState: SessionState = {
  user: undefined,
};

export const reducer = handle.reducer(initialState).on(SessionActions.loginSucceeded, (state, { user }) => {
  state.user = user;
});

// --- Module ---
export const useSessionModule = handle;
