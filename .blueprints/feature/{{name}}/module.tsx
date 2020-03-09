import React from 'react';
import { {{pascalCase name}}View } from './components/{{pascalCase name}}View';
import { {{pascalCase name}}Actions, {{pascalCase name}}State, handle } from './interface';

// --- Epic ---
export const epic = handle.epic();

// --- Reducer ---
const initialState: {{pascalCase name}}State = {
  foo: 'bar',
};

export const reducer = handle.reducer(initialState);

// --- Module ---
export const {{pascalCase name}}Module = () => {
  handle();
  return <{{pascalCase name}}View />;
};
