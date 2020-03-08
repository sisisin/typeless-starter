import React from 'react';
import { getSampleState } from '../interface';
import { Link } from 'react-router-dom';
import { useRouter } from 'app/hooks/useRouter';

export const SampleView = () => {
  const { foo } = getSampleState.useState();
  const { params } = useRouter();
  return (
    <>
      <div>Feature sample {foo}</div>
      <div>params: {JSON.stringify(params, null, '  ')}</div>
      <div>
        <Link to="/sample">sample</Link>
      </div>
      <div>
        <Link to="/sample/15">with path route</Link>
      </div>
    </>
  );
};
