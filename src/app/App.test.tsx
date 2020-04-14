import { LoginModule } from 'app/features/login/module';
import { render, TestProvider } from 'app/testHelpers/unitTest';
import React from 'react';
import ReactDOM from 'react-dom';
import { App } from './App';
import { SampleModule } from './features/sample/module';
import { navigateAndWaitForRendered } from './testHelpers/unitTest';

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
  const node = render(<App></App>, { withAuth: false });
  await navigateAndWaitForRendered('/login', { queryParams: {} });
  expect(node).toRenderComponent(LoginModule);
});

it('renders sample with /', async () => {
  const node = render(<App></App>, { withAuth: true });
  await navigateAndWaitForRendered('/', {});
  expect(node).toRenderComponent(SampleModule);
});

it('renders sample with /sample', async () => {
  const node = render(<App></App>, { withAuth: true });
  await navigateAndWaitForRendered('/sample', {});
  expect(node).toRenderComponent(SampleModule);
});
