import { lazyRoutes } from 'app/components/AppRoutes';
import { TestProvider } from 'app/testHelpers/storybook';
import React from 'react';
import ReactDOM from 'react-dom';
import renderer from 'react-test-renderer';
import { App } from './App';
import { appHistory } from './services/appHistory';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(
    <TestProvider>
      <App />
    </TestProvider>,
    div,
  );
  ReactDOM.unmountComponentAtNode(div);
  expect(true).toBeTruthy();
});

it('renders login', async () => {
  const node = renderer.create(
    <TestProvider>
      <App></App>
    </TestProvider>,
  );
  appHistory.push('/login');
  await lazyRoutes.find(({ path }) => path === '/login')!.Component.load();
  expect(node!.toJSON()).toMatchSnapshot();
});
