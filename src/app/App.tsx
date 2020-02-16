import { createBrowserNavigation } from 'navi';
import React from 'react';
import { Router, View } from 'react-navi';
import { DefaultSuspense } from './components/DefaultSuspense';
import { routes } from './routes';

const navigation = createBrowserNavigation({ routes });

export const App: React.FC = () => {
  return (
    <Router navigation={navigation}>
      <DefaultSuspense>
        <View></View>
      </DefaultSuspense>
    </Router>
  );
};
