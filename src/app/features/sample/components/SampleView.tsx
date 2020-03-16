import React from 'react';
import { getSampleState } from '../interface';
import { TypedLink } from 'app/components/Link';
import { useRouter } from 'app/hooks/useRouter';

export const SampleView = () => {
  const { foo } = getSampleState.useState();
  const { params } = useRouter();
  return (
    <>
      <div>Feature sample {foo}</div>
      <div>params: {JSON.stringify(params, null, '  ')}</div>
      <div>
        <TypedLink path="/sample">sample</TypedLink>
      </div>
      <div>
        <TypedLink path="/sample/:id" params={{ id: '15' }}>
          with path route
        </TypedLink>
      </div>
    </>
  );
};
