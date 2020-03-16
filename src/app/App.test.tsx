import { LoginModule } from 'app/features/login/module';
import { TestProvider } from 'app/testHelpers/unitTest';
import React from 'react';
import ReactDOM from 'react-dom';
import renderer from 'react-test-renderer';
import { App } from './App';
import { navigateAndWaitRendered } from './testHelpers/unitTest';

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
  await navigateAndWaitRendered('/login', { queryParams: {} });
  expect(node).toRenderComponent(LoginModule);
});
