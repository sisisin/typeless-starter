import React from 'react';
import { DefaultTypelessProvider } from 'typeless';

export const AppProvider = (props: { children: any }) => {
  return <DefaultTypelessProvider>{props.children}</DefaultTypelessProvider>;
};
