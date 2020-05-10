import { createModule } from 'typeless';
import { SampleSymbol } from './symbol';

// --- Actions ---
export const [handle, SampleActions, getSampleState] = createModule(SampleSymbol)
  .withActions({ $mounted: null })
  .withState<SampleState>();

// --- Types ---
export interface SampleState {
  foo: string;
}
