import React from 'react';

import { storiesOf } from '@storybook/react';
import { LoginModule } from './module';
import { AppProvider } from 'app/testHelpers/storybook';

storiesOf('Login', module).add('basic', () => {
  return (
    <AppProvider>
      <LoginModule></LoginModule>
    </AppProvider>
  );
});
