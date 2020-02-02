import { createModule } from 'typeless';
import { SampleSymbol } from './symbol';

// --- Actions ---
export const [handle, SampleActions, getSampleState] = createModule(SampleSymbol)
  .withActions({})
  .withState<SampleState>();

// --- Types ---
export interface SampleState {
  foo: string;
}
