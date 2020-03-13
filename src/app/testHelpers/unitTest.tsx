import { AppRoutePaths, routes } from 'app/components/AppRoutes';
import { appHistory } from 'app/services/appHistory';
import React from 'react';
import { Action, Deps, Epic, Registry, TypelessContext } from 'typeless';
import * as Rx from 'typeless/rx';

export async function navigateAndWaitRendered<T extends keyof AppRoutePaths>(identity: T, option: AppRoutePaths[T]) {
  appHistory.push(identity, option);
  await routes[identity].Component.load();
}

export const TestProvider: React.FC = (props) => {
  return <TypelessContext.Provider value={{ registry: new Registry() }}>{props.children}</TypelessContext.Provider>;
};

export async function runEpic<T = any[]>(sourceEpic: Epic, action: any): Promise<T[]> {
  const results: T[] = [];
  await Rx.mergeObs(...sourceEpic.toStream(action as Action, {} as Deps)).forEach((action) => results.push(action));
  return results;
}
