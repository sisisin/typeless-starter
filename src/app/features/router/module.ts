import { navigation } from 'app/routes';
import * as Rx from 'typeless/rx';
import { handle, RouterActions, RouterState } from './interface';
import { ActionLike } from 'typeless';

// --- Epic ---
export const epic = handle.epic().onMany([RouterActions.$mounted, RouterActions.$remounted], (_, { action$ }) => {
  return new Rx.Observable<ActionLike>((subscriber) => {
    const n = navigation.subscribe((route) => {
      if (route.type === 'ready') {
        subscriber.next(RouterActions.routeChanged(route));
      }
    });
    return () => n.unsubscribe();
  }).pipe(Rx.takeUntil(action$.pipe(Rx.ofType([RouterActions.$remounted, RouterActions.$unmounted]))));
});

// --- Reducer ---
const initialState: RouterState = {
  title: '',
  url: {} as any,
  params: {},
};

export const reducer = handle.reducer(initialState).on(RouterActions.routeChanged, (state, { route }) => {
  state.params = route.chunks.find((c) => c.type === 'view' && c.request?.params)?.request?.params ?? {};
  state.title = route.title ?? '';
  state.url = route.url;
});

// --- Module ---
export const useRouterModule = () => {
  handle();
};
