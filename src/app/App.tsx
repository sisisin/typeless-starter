import React from 'react';
import { Router } from 'react-router-dom';
import { AppRoutes } from './components/AppRoutes';
import { useSessionModule } from './features/session/module';
import { appHistory } from './services/appHistory';
import { useRouterModule } from './features/router/module';

export const App: React.FC = () => {
  useSessionModule();
  useRouterModule();
  return (
    <Router {...appHistory.toRouterProps()}>
      <AppRoutes></AppRoutes>
    </Router>
  );
};
