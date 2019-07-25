import React from 'react';
import { SampleView } from './components/SampleView';
import { SampleActions, SampleState, handle } from './interface';
import { route, mount } from 'navi';

// --- Epic ---
handle.epic();

// --- Reducer ---
const initialState: SampleState = {
  foo: 'bar',
};

export const reducer = handle.reducer(initialState);

// --- Module ---
const SampleModule = () => {
  handle();
  return <SampleView />;
};

// eslint-disable-next-line import/no-default-export
export default mount({
  '/': route({
    title: 'Sample',
    view: <SampleModule></SampleModule>,
  }),
});
