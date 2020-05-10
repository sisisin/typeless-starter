import React from 'react';
import { useAppParams, getAppParams } from '../router/interface';
import { SampleView } from './components/SampleView';
import { handle, SampleState, SampleActions } from './interface';

// --- Epic ---
export const epic = handle.epic().on(SampleActions.$mounted, () => {
  console.log('$mounted', getAppParams('/sample/:id'));
  return null;
});

// --- Reducer ---
const initialState: SampleState = {
  foo: 'bar',
};

export const reducer = handle.reducer(initialState);

// --- Module ---
const useSampleModule = handle;
export const SampleModule = () => {
  console.log('sample rendered');
  useSampleModule();
  const p = useAppParams('/sample/:id');
  console.log(p);
  return <SampleView />;
};
