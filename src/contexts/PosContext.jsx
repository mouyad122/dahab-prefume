'use client';

import React, { createContext, useContext } from 'react';

export const PosContext = createContext(null);

export function PosProvider({ children, employee, permissions }) {
  return (
    <PosContext.Provider value={{ employee, permissions }}>
      {children}
    </PosContext.Provider>
  );
}

export function usePosContext() {
  const context = useContext(PosContext);
  return context || { employee: null, permissions: {} };
}
