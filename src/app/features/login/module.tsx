import React from 'react';
import { LoginView } from './components/LoginView';
import { LoginActions, handle } from './interface';
import { SessionActions } from '../session/interface';
import { login } from 'app/services/http/login';

// --- Epic ---
export const epic = handle.epic().on(LoginActions.loginSubmitted, async () => {
  const res = await login('hoge');
  return SessionActions.loginSucceeded({ name: res.body.path });
});

// --- Module ---
export const LoginModule = () => {
  handle();
  return <LoginView />;
};
