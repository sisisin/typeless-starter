import { createModule } from 'typeless';
import { {{pascalCase name}}Symbol } from './symbol';

// --- Actions ---
const modules = createModule({{pascalCase name}}Symbol)
  .withActions({})
  .withState<{{pascalCase name}}State>();

export const handle = modules[0];
export const {{pascalCase name}}Actions = modules[1];
export const get{{pascalCase name}}State = modules[2];

// --- Types ---
export interface {{pascalCase name}}State {
  foo: string;
}
