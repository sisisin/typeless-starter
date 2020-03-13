import loadable, { LoadableComponent } from '@loadable/component';
import { Merge, ToUnion, ToStringObject } from 'app/types/utility';

type RouteDefinitionsBase = {
  [key: string]: {
    readonly path: string | readonly string[];
    readonly params?: readonly string[];
    readonly queryParams?: readonly string[];
    readonly requiresAuth: boolean;
    readonly Component: LoadableComponent<unknown>;
  };
};

export const appRouteDefinitions = {
  home: {
    path: ['/', '/sample'],
    requiresAuth: true,
    Component: loadable(() =>
      import('app/features/sample/module').then((m) => ({ default: m.SampleModule })),
    ) as LoadableComponent<unknown>,
  },
  sampleWithId: {
    path: '/sample/:id',
    params: ['id'],
    requiresAuth: true,
    Component: loadable(() =>
      import('app/features/sample/module').then((m) => ({ default: m.SampleModule })),
    ) as LoadableComponent<unknown>,
  },
  login: {
    path: '/login',
    queryParams: ['from'],
    requiresAuth: false,
    Component: loadable(() =>
      import('app/features/login/module').then((m) => ({ default: m.LoginModule })),
    ) as LoadableComponent<unknown>,
  },
} as const;

type RouteDefinitions = typeof appRouteDefinitions;
export type AppRoutePaths = {
  [K in keyof RouteDefinitions]: Merge<
    { path: ToUnion<RouteDefinitions[K]['path']> },
    RouteDefinitions[K] extends { params: infer V } ? { params: ToStringObject<ToUnion<V>> } : { params?: never },
    RouteDefinitions[K] extends { queryParams: infer W }
      ? { queryParams: Partial<ToStringObject<ToUnion<W>>> }
      : { queryParams?: never }
  >;
};

type ValidateRouteDefinitions = RouteDefinitions extends RouteDefinitionsBase ? true : never;

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const x: ValidateRouteDefinitions = true;
