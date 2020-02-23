import { mount, redirect, route, createBrowserNavigation } from 'navi';

const routes = mount({
  '/sample': route({
    title: 'Sample',
    getView: () => import('./features/sample/module'),
  }),
  '/sample/:id': route({
    title: 'Sample',
    getView: () => import('./features/sample/module'),
  }),
  '*': redirect('/sample'),
});

export const navigation = createBrowserNavigation({ routes });
