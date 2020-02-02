import React from 'react';

import { storiesOf } from '@storybook/react';
import { handle } from './interface';
import { SampleModule } from './module';
import { AppProvider } from 'app/testHelpers/storybook';

handle.reset();

storiesOf('Sample', module)
  .add('with text', () => {
    handle.reducer({ foo: 'baaaaaaa' });
    return (
      <AppProvider>
        <SampleModule></SampleModule>
      </AppProvider>
    );
  })
  .add('with ba', () => {
    handle.reducer({ foo: 'b' });
    return (
      <AppProvider>
        <SampleModule></SampleModule>
      </AppProvider>
    );
  });
