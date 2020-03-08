import React from 'react';
import { AppRoutes } from './components/AppRoutes';
import { useSessionModule } from './features/session/module';

export const App: React.FC = () => {
  useSessionModule();

  return <AppRoutes></AppRoutes>;
};
