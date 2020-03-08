import React from 'react';
import { useActions } from 'typeless';
import { LoginActions } from '../interface';

export const LoginView = () => {
  const { loginSubmitted } = useActions(LoginActions);
  return (
    <div>
      <div>login!</div>
      <button onClick={loginSubmitted}>submit</button>
    </div>
  );
};
