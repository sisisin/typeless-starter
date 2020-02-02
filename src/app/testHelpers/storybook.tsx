import React from 'react';
import { DefaultTypelessProvider } from 'typeless';

export const AppProvider: React.FC = (props) => {
  return <DefaultTypelessProvider>{props.children as any}</DefaultTypelessProvider>;
};
