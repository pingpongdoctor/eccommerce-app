import { SanityDocument } from 'next-sanity';
import { loadQuery } from '@/sanity/lib/store';
import { PRODUCTS_QUERY } from '@/sanity/lib/queries';
import { draftMode } from 'next/headers';
import { notFound } from 'next/navigation';
import ProductCardsPreview from '@/app/_components/ProductCardsPreview';
import ProductsWithSearchBar from '@/app/_components/ProductsWithSearchBar';
import GoBackBtn from '../_components/GoBackBtn';

export default async function ProductsPage() {
  const initial = await loadQuery<(SanityProduct & SanityDocument)[]>(
    PRODUCTS_QUERY,
    {},
    {
      perspective: draftMode().isEnabled ? 'previewDrafts' : 'published',
    }
  );

  if (!initial.data) {
    notFound();
  }

  return (
    <main className="relative">
      <GoBackBtn goBackBtnClassname="text-gray-700 px-4 md:px-8 lg:px-12 xl:mx-auto xl:max-w-7xl" />
      <div className="mt-28 px-4 md:px-8 lg:px-12 xl:mx-auto xl:max-w-7xl">
        <h1 className="mb-6 text-center">All Products</h1>
        <p className="mb-8 text-balance text-center lg:mb-12">
          We have everything you need
        </p>

        <div className="mb-8 h-[2px] w-full rounded-xl bg-gray-200 lg:mb-12"></div>
      </div>

      {draftMode().isEnabled ? (
        <ProductCardsPreview initial={initial} />
      ) : (
        <ProductsWithSearchBar products={initial.data} />
      )}
    </main>
  );
}
