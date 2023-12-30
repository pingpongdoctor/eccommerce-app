import { notFound } from 'next/navigation';
import FormComponent from './_components/FormComponent';
import TableComponent from './_components/TableComponent';
import { getAllUserData } from './_lib/getAllUserData';

export default async function Home() {
  const data = await getAllUserData();

  if (!data) {
    notFound();
  }

  return (
    <main className="mx-2 my-4 sm:mx-6 sm:my-8">
      <FormComponent />
      <TableComponent users={data} />
    </main>
  );
}
