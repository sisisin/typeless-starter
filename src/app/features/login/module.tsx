import React from 'react';
import { LoginView } from './components/LoginView';
import { LoginActions, handle } from './interface';
import { SessionActions } from '../session/interface';

// --- Epic ---
export const epic = handle.epic().on(LoginActions.loginSubmitted, () => {
  // some login process
  return SessionActions.loginSucceeded({ name: 'hoge' });
});

// --- Module ---
// eslint-disable-next-line import/no-default-export
export default () => {
  handle();
  return <LoginView />;
};
