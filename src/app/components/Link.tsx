import { useRouter } from 'app/hooks/useRouter';
import { AppPaths, GetOptionFromPath } from 'app/types/AppRouteDefinitions';
import { LocationSource } from 'app/types/location';
import React from 'react';
// eslint-disable-next-line no-restricted-imports
import { Link as RouterLink } from 'react-router-dom';

export function TypedLink<T extends AppPaths>(
  props: React.PropsWithChildren<{ path: T } & GetOptionFromPath<T>>,
): JSX.Element;
export function TypedLink({ children, ...option }: React.PropsWithChildren<LocationSource>) {
  const { history } = useRouter();
  const to = history.createHref(option);
  return <RouterLink to={to}>{children}</RouterLink>;
}

export function AnyLink(props: React.PropsWithChildren<LocationSource>): JSX.Element;
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function AnyLink({ children, ...option }: React.PropsWithChildren<any>) {
  return <TypedLink {...option}>{children}</TypedLink>;
}
