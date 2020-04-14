import React from 'react';
import { SampleView } from './components/SampleView';
import { handle, SampleState } from './interface';

// --- Epic ---
export const epic = handle.epic();

// --- Reducer ---
const initialState: SampleState = {
  foo: 'bar',
};

export const reducer = handle.reducer(initialState);

// --- Module ---
const useSampleModule = handle;
export const SampleModule = () => {
  useSampleModule();
  return <SampleView />;
};
