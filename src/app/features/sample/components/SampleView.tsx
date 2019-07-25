import React from 'react';
import { getSampleState } from '../interface';

export const SampleView = () => {
  const { foo } = getSampleState.useState();
  return <div>Feature sample {foo}</div>;
};
