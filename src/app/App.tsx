import React from 'react';
import { Router, View } from 'react-navi';
import { DefaultSuspense } from './components/DefaultSuspense';
import { navigation } from './routes';
import { useRouterModule } from 'app/features/router/module';

export const App: React.FC = () => {
  useRouterModule();
  return (
    <Router navigation={navigation}>
      <DefaultSuspense>
        <View></View>
      </DefaultSuspense>
    </Router>
  );
};
