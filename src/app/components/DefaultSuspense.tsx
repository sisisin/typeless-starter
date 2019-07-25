import React from 'react';

interface DefaultSuspenseProps {
  children: React.ReactNode;
}

export function DefaultSuspense(props: DefaultSuspenseProps) {
  const { children } = props;
  return <React.Suspense fallback="loading...">{children}</React.Suspense>;
}
