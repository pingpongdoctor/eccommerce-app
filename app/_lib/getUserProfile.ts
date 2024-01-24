import { User } from '@prisma/client';
import { baseUrl } from '../utils/baseUrl';

export async function getUserProfile(): Promise<
  Omit<User, 'auth0Id'> | undefined
> {
  try {
    const res = await fetch(`${baseUrl}/api/user`, {
      headers: {
        'Content-Type': 'application/json',
      },
    });

    const data = await res.json();

    if (!res.ok) {
      console.log(data.message);
      return undefined;
    }

    return data.data;
  } catch (e: any) {
    console.log('Error fetching user data' + ' ' + e);
    return undefined;
  }
}
