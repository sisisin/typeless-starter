import React from 'react';
import { Action, Deps, Epic, Registry, TypelessContext } from 'typeless';
import * as Rx from 'typeless/rx';
import renderer from 'react-test-renderer';
import { useSessionModule } from 'app/features/session/module';
import { AppPaths, appRouteDefinitions, GetOptionFromPath } from 'app/types/AppRouteDefinitions';
import { appHistory } from 'app/services/appHistory';

export async function navigateAndWaitForRendered<T extends AppPaths>(path: T, option: GetOptionFromPath<T>) {
  appHistory.push(path, option);
  await Object.values(appRouteDefinitions)
    .find(({ path: p }) => (p as string | string[]).indexOf(path) > -1)
    ?.Component.load();
}

export const TestProvider: React.FC = (props) => {
  return <TypelessContext.Provider value={{ registry: new Registry() }}>{props.children}</TypelessContext.Provider>;
};

export const render = (node: React.ReactElement, option: { withAuth: boolean }) => {
  if (option.withAuth) {
    useSessionModule.reset();
    useSessionModule.reducer({ user: { name: 'some name' } });
  }

  return renderer.create(<TestProvider>{node}</TestProvider>);
};

export async function runEpic<T = any[]>(sourceEpic: Epic, action: any): Promise<T[]> {
  const results: T[] = [];
  await Rx.mergeObs(...sourceEpic.toStream(action as Action, {} as Deps)).forEach((action) => results.push(action));
  return results;
}
