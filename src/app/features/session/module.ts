import { appHistory } from 'app/services/appHistory';
import { handle, SessionActions, SessionState } from './interface';

// --- Epic ---
export const epic = handle.epic().on(SessionActions.loginSucceeded, () => {
  appHistory.push('/authed');
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
