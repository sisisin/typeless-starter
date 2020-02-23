import React from 'react';
import ReactDOM from 'react-dom';
import { App } from './App';
import { AppProvider } from 'app/testHelpers/storybook';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(
    <AppProvider>
      <App />
    </AppProvider>,
    div,
  );
  ReactDOM.unmountComponentAtNode(div);
  expect(true).toBeTruthy();
});
