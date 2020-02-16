import React from 'react';
import { SampleView } from './components/SampleView';
import { handle, SampleState } from './interface';

// --- Epic ---
handle.epic();

// --- Reducer ---
const initialState: SampleState = {
  foo: 'bar',
};

export const reducer = handle.reducer(initialState);

// --- Module ---
export const SampleModule = () => {
  handle();
  return <SampleView />;
};

// eslint-disable-next-line import/no-default-export
export default () => {
  handle();
  return <SampleView />;
};
