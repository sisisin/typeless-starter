import loadable, { LoadableComponent } from '@loadable/component';
import { ToUnion, ToStringObject } from 'app/types/utility';
import { AuthGuardType } from './AuthGuardType';

type RouteDefinitionsBase = {
  [key: string]: {
    readonly path: string | readonly string[];
    readonly params?: readonly string[];
    readonly queryParams?: readonly string[];
    readonly authGuardType: AuthGuardType;
    readonly Component: LoadableComponent<unknown>;
  };
};

export const appRouteDefinitions = {
  home: {
    path: ['/', '/sample'],
    authGuardType: 'private',
    Component: loadable(() =>
      import('app/features/sample/module').then((m) => ({ default: m.SampleModule })),
    ) as LoadableComponent<unknown>,
  },
  sampleWithId: {
    path: '/sample/:id',
    params: ['id'],
    authGuardType: 'private',
    Component: loadable(() =>
      import('app/features/sample/module').then((m) => ({ default: m.SampleModule })),
    ) as LoadableComponent<unknown>,
  },
  login: {
    path: '/login',
    queryParams: ['from'],
    authGuardType: 'publicWithRedirectIfLoggedIn',
    Component: loadable(() =>
      import('app/features/login/module').then((m) => ({ default: m.LoginModule })),
    ) as LoadableComponent<unknown>,
  },
} as const;

// route definition type
type RD = typeof appRouteDefinitions;
type Paths = {
  [K in keyof RD]: { path: ToUnion<RD[K]['path']> };
};
type Params = {
  [K in keyof RD]: RD[K] extends { params: infer V } ? { params: ToStringObject<ToUnion<V>> } : {};
};
type QueryParams = {
  [K in keyof RD]: RD[K] extends { queryParams: infer W } ? { queryParams?: Partial<ToStringObject<ToUnion<W>>> } : {};
};

export type AppPaths = Paths[keyof Paths]['path'];
export type GetSourceFromPath<T extends AppPaths> = {
  [K in keyof RD]: T extends ToUnion<RD[K]['path']> ? Paths[K] & Params[K] & QueryParams[K] : never;
}[keyof RD];
export type GetOptionFromPath<T extends AppPaths> = {
  [K in keyof RD]: T extends ToUnion<RD[K]['path']> ? Params[K] & QueryParams[K] : never;
}[keyof RD];

// note: this is checking type of `RouteDefinitions`
type ValidateRouteDefinitions = RD extends RouteDefinitionsBase ? true : never;
export function validateRouteDefinitions(): ValidateRouteDefinitions {
  return true;
}
