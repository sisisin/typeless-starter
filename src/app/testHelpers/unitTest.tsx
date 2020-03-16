import { appHistory } from 'app/services/appHistory';
import { AppPaths, appRouteDefinitions, GetOptionFromPath } from 'app/types/AppRouteDefinitions';
import React from 'react';
import { Action, Deps, Epic, Registry, TypelessContext } from 'typeless';
import * as Rx from 'typeless/rx';

export async function navigateAndWaitRendered<T extends AppPaths>(path: T, option: GetOptionFromPath<T>) {
  appHistory.push(path, option);
  await Object.values(appRouteDefinitions)
    .find(({ path: p }) => (p as string | string[]).indexOf(path) > -1)
    ?.Component.load();
}

export const TestProvider: React.FC = (props) => {
  return <TypelessContext.Provider value={{ registry: new Registry() }}>{props.children}</TypelessContext.Provider>;
};

export async function runEpic<T = any[]>(sourceEpic: Epic, action: any): Promise<T[]> {
  const results: T[] = [];
  await Rx.mergeObs(...sourceEpic.toStream(action as Action, {} as Deps)).forEach((action) => results.push(action));
  return results;
}
