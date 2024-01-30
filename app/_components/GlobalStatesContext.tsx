'use client';
import React from 'react';
import { createContext, useState } from 'react';

export const globalStatesContext = createContext<any>(null);

export default function GlobalStatesContext({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isNewProductAddedToCart, setIsNewProductAddedToCart] =
    useState<boolean>(false);

  return (
    <globalStatesContext.Provider
      value={{ isNewProductAddedToCart, setIsNewProductAddedToCart }}
    >
      {children}
    </globalStatesContext.Provider>
  );
}
