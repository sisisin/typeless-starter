import React from 'react';
import { {{pascalCase name}}View } from './components/{{pascalCase name}}View';
import { {{pascalCase name}}Actions, {{pascalCase name}}State, handle } from './interface';
import { route, mount } from 'navi';

// --- Epic ---
handle.epic();

// --- Reducer ---
const initialState: {{pascalCase name}}State = {
  foo: 'bar',
};

export const reducer = handle.reducer(initialState);

// --- Module ---
const {{pascalCase name}}Module = () => {
  handle();
  return <{{pascalCase name}}View />;
};

// eslint-disable-next-line import/no-default-export
export default mount({
  '/': route({
    title: '{{pascalCase name}}',
    view: <{{pascalCase name}}Module></{{pascalCase name}}Module>,
  }),
});
