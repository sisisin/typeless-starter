import { createModule } from 'typeless';
import { SampleSymbol } from './symbol';

// --- Actions ---
const modules = createModule(SampleSymbol)
  .withActions({})
  .withState<SampleState>();

export const handle = modules[0];
export const SampleActions = modules[1];
export const getSampleState = modules[2];

// --- Types ---
export interface SampleState {
  foo: string;
}
