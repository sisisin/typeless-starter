import { mount, redirect, route } from 'navi';

export const routes = mount({
  '/sample': route({
    title: 'Sample',
    getView: () => import('./features/sample/module'),
  }),
  '*': redirect('/sample'),
});
