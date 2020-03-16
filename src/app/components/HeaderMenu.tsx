import React from 'react';
import { TypedLink, AnyLink } from 'app/components/Link';

export const HeaderMenu = () => {
  return (
    <>
      <div>
        <TypedLink path="/sample">sample </TypedLink>
      </div>
      <div>
        <TypedLink path="/login">login page</TypedLink>
      </div>
      <div>
        <AnyLink path="/authed">authed</AnyLink>
      </div>
      <div>
        <AnyLink path="/no_matched">no_matched</AnyLink>
      </div>
      <hr></hr>
    </>
  );
};
