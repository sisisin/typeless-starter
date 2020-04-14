import { handle, SessionActions, SessionState } from './interface';
import { appHistory } from 'app/services/appHistory';

const sessKey = 'sess_key';

// --- Epic ---
export const epic = handle.epic().on(SessionActions.loginSucceeded, ({ user }) => {
  localStorage.setItem(sessKey, JSON.stringify(user));
  const from = appHistory.location.searchParams.get('from');
  const path = from ? decodeURIComponent(from) : '/';
  appHistory.push({ path });
  return null;
});

// --- Reducer ---
const initialState: SessionState = {
  user: undefined,
};

export const reducer = handle
  .reducer(initialState)
  .on(SessionActions.$mounted, (state) => {
    const item = localStorage.getItem(sessKey);
    if (item) {
      state.user = JSON.parse(item);
    }
  })
  .on(SessionActions.loginSucceeded, (state, { user }) => {
    state.user = user;
  });

// --- Module ---
export const useSessionModule = handle;
