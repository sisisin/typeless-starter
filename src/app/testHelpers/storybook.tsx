import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { Registry, TypelessContext } from 'typeless';

export const AppProvider: React.FC = (props) => {
  return (
    <TypelessContext.Provider value={{ registry: new Registry() }}>
      <MemoryRouter>{props.children}</MemoryRouter>
    </TypelessContext.Provider>
  );
};
