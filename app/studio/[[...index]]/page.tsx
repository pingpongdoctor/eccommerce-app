'use client';
import { NextStudio } from 'next-sanity/studio';
import config from '../../../sanity.config';
import { useContext, useEffect } from 'react';
import { globalStatesContext } from '@/app/_components/GlobalStatesContext';
import { useRouter } from 'next/navigation';

export default function StudioPage() {
  const { user, isLoading } = useContext(globalStatesContext);
  const router = useRouter();

  useEffect(() => {
    //prodtect this page from unauthenticated users
    if (!isLoading && !user) {
      router.back();
    }

    //protect this page from users who do not have admin role
    if (!isLoading && user) {
      const isAdmin: boolean =
        user[
          process.env.NEXT_PUBLIC_AUTH0_CUSTOM_ROLE_CLAIM as string
        ].includes('admin');

      !isAdmin && router.back();
    }
  }, [user, isLoading, router]);

  return <NextStudio config={config} />;
}
