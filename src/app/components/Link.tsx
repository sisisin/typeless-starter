import { Link as RouterLink } from 'react-router-dom';

import React from 'react';
import { AppPaths, GetSourceFromPath } from 'app/types/AppRouteDefinitions';
import { useRouter } from 'app/hooks/useRouter';
import { LocationSource } from 'app/types/location';

export function Link<T extends AppPaths>(
  props: React.PropsWithChildren<GetSourceFromPath<T>>,
): JSX.Element;
export function Link({ children, ...option }: React.PropsWithChildren<LocationSource>) {
  const { history } = useRouter();
  const to = history.createHref(option);
  return <RouterLink to={to}>{children}</RouterLink>;
}