import { Action, Deps, Epic } from 'typeless';
import * as Rx from 'typeless/rx';
import { AppRoutePaths, routes } from 'app/components/AppRoutes';
import { appHistory } from 'app/services/appHistory';
import React from 'react';
import { generatePath } from 'react-router-dom';
import { Registry, TypelessContext } from 'typeless';

export async function navigateAndWaitRendered(
  path: AppRoutePaths,
  params?: { [paramName: string]: string | number | boolean | undefined },
) {
  appHistory.push(generatePath(path, params));
  await routes.find((r) => r.path === path)!.Component.load();
}

export const TestProvider: React.FC = (props) => {
  return <TypelessContext.Provider value={{ registry: new Registry() }}>{props.children}</TypelessContext.Provider>;
};

export async function runEpic<T = any[]>(sourceEpic: Epic, action: any): Promise<T[]> {
  const results: T[] = [];
  await Rx.mergeObs(...sourceEpic.toStream(action as Action, {} as Deps)).forEach((action) => results.push(action));
  return results;
}
