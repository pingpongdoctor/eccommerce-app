import { getSession } from '@auth0/nextjs-auth0';
import { redirect } from 'next/navigation';

export default async function AdminPage() {
  const session = await getSession();

  const isAdmin =
    session?.user[process.env.AUTH0_CUSTOM_ROLE_CLAIM as string].include(
      'admin'
    );

  if (!isAdmin) {
    redirect('/');
  }

  return <div></div>;
}
