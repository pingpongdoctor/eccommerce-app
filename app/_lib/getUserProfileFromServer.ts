import { baseUrl } from '../utils/baseUrl';
import { User } from '@prisma/client';
import { headers } from 'next/headers';
import { getSession } from '@auth0/nextjs-auth0';

export async function getUserProfileFromServer(): Promise<
  Omit<User, 'auth0Id'> | undefined
> {
  const session = await getSession();

  if (!session) {
    console.log('Please log in');
  }

  try {
    const res = await fetch(`${baseUrl}/api/user`, {
      headers: headers(),
    });

    const data = await res.json();

    if (!res.ok) {
      console.log('Error fetching user profile' + ' ' + data.message);
      return undefined;
    }

    return data.data;
  } catch (e: any) {
    console.log('Error in getUserProfile function' + ' ' + e.message);
    return undefined;
  }
}
