import { RouteEntry } from 'app/types';
import { createBrowserNavigation, Matcher, mount, redirect } from 'navi';
import React from 'react';
import { Router, View } from 'react-navi';
import { DefaultSuspense } from './components/DefaultSuspense';

const staticRoute: Record<string, Matcher<any, any>> = {
  '*': redirect(() => {
    return '/sample';
  }),
};

const resolveRoutes = () => {
  const req = require.context('./features', true, /route.tsx?$/);
  const targetModules = req.keys().map((key) => req(key));
  const matcherEntry = targetModules.reduce((acc, module) => {
    const routeEntry: RouteEntry | undefined = module['routeEntry'];

    if (routeEntry === undefined) {
      return acc;
    }

    return {
      ...acc,
      [routeEntry.path]: routeEntry.routes,
    };
  }, {});

  return mount({ ...matcherEntry, ...staticRoute });
};

const routes = resolveRoutes();
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
