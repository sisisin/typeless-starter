import { createModule } from 'typeless';
import { SessionSymbol } from './symbol';
import { User } from 'app/types/User';

// --- Actions ---
export const [handle, SessionActions, getSessionState] = createModule(SessionSymbol)
  .withActions({ loginSucceeded: (user: User) => ({ payload: { user } }) })
  .withState<SessionState>();

// --- Types ---
export interface SessionState {
  user: User | undefined;
}
