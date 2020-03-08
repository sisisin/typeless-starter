import React from 'react';
import { Link } from 'react-router-dom';

export const HeaderMenu = () => {
  return (
    <>
      <div>
        <Link to={{ pathname: '/sample' }}>sample </Link>
      </div>
      <div>
        <Link to={{ pathname: '/login' }}>login page</Link>
      </div>
      <div>
        <Link to={{ pathname: '/authed' }}>authed</Link>
      </div>
      <div>
        <Link to="/no_matched">no_matched</Link>
      </div>
      <hr></hr>
    </>
  );
};
