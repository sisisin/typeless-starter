import React from 'react';
import { Router } from 'react-router-dom';
import { AppRoutes } from './components/AppRoutes';
import { useSessionModule } from './features/session/module';
import { appHistory } from './services/appHistory';

export const App: React.FC = () => {
  useSessionModule();

  return (
    <Router {...appHistory.toRouterProps()}>
      <AppRoutes></AppRoutes>
    </Router>
  );
};
