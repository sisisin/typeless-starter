import React from 'react';
import { getSampleState } from '../interface';
import { Link } from 'react-navi';
import { getRouterState } from 'app/features/router/interface';

export const SampleView = () => {
  const { foo } = getSampleState.useState();
  const { params } = getRouterState.useState();
  return (
    <>
      <div>Feature sample {foo}</div>
      <div>params: {JSON.stringify(params, null, '  ')}</div>
      <div>
        <Link href="/sample">sample</Link>
      </div>
      <div>
        <Link href="/sample/15">with path route</Link>
      </div>
    </>
  );
};
