import FormComponent from "./_components/FormComponent";
import TableComponent from "./_components/TableComponent";
export default async function Home() {
  return (
    <main className="my-4 mx-2 sm:my-8 sm:mx-6">
      <FormComponent />
      <TableComponent />
    </main>
  );
}
