import React from 'react';
import { getSampleState } from '../interface';
import { Link } from 'react-navi';
import { useRouter } from 'app/hooks/useRouter';

export const SampleView = () => {
  const { foo } = getSampleState.useState();
  const { params } = useRouter();
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
