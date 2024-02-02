'use client';
import React from 'react';
import { createContext, useState, useEffect } from 'react';
import { useUser } from '@auth0/nextjs-auth0/client';
import { User } from '@prisma/client';
import { getUserProfileFromClientSide } from '../_lib/getUserProfileFromClientSide';

export const globalStatesContext = createContext<any>(null);

export default function GlobalStatesContext({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user, isLoading } = useUser();
  const [changeProductsInCart, setChangeProductsInCart] =
    useState<boolean>(false);
  const [
    needToRevalidateDataForShoppingCartPage,
    setNeedToRevalidateDataForShoppingCartPage,
  ] = useState<boolean>(false);
  const [userProfile, setUserProfile] = useState<Omit<User, 'auth0Id'> | null>(
    null
  );

  useEffect(() => {
    //set user profile state
    if (user) {
      getUserProfileFromClientSide().then(
        (userData: Omit<User, 'auth0Id'> | undefined) => {
          if (userData) {
            setUserProfile(userData);
          }
        }
      );
    }
  }, [user]);

  return (
    <globalStatesContext.Provider
      value={{
        changeProductsInCart,
        setChangeProductsInCart,
        userProfile,
        isLoading,
        needToRevalidateDataForShoppingCartPage,
        setNeedToRevalidateDataForShoppingCartPage,
      }}
    >
      {children}
    </globalStatesContext.Provider>
  );
}
