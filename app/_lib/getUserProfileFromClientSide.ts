import { User } from '@prisma/client';
import { baseUrl } from '../utils/baseUrl';

export async function getUserProfileFromClientSide(): Promise<
  Omit<User, 'auth0Id' | 'id'> | undefined
> {
  try {
    const res = await fetch(`${baseUrl}/api/user`, {
      headers: {
        'Content-Type': 'application/json',
      },
    });

    const data = await res.json();

    if (!res.ok) {
      console.log('Error fetching user profile' + ' ' + data.message);
      return undefined;
    }

    return data.data;
  } catch (e: any) {
    console.log('Error in getUserProfileFromClientSide function' + ' ' + e);
    return undefined;
  }
}
