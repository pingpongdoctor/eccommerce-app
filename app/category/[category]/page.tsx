import { SanityDocument, QueryParams } from 'next-sanity';
import { loadQuery } from '@/sanity/lib/store';
import {
  PRODUCTS_QUERY,
  PRODUCTS_QUERY_BY_CATEGORY,
} from '@/sanity/lib/queries';
import { draftMode } from 'next/headers';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import { categories } from '@/app/utils/utils';
import ProductCardsPreview from '@/app/_components/ProductCardsPreview';
import ProductsWithSearchBar from '@/app/_components/ProductsWithSearchBar';
import { textInfor } from '@/app/utils/utils';

export async function generateMetadata({
  params,
}: {
  params: QueryParams;
}): Promise<Metadata> {
  if (!categories.includes(params.category)) {
    return {
      title: 'Products',
    };
  }

  return {
    title: params.category + 'products',
  };
}

export async function generateStaticParams() {
  return categories.map((category) => ({
    category,
  }));
}

export default async function Category({ params }: { params: QueryParams }) {
  const initial = await loadQuery<(SanityProduct & SanityDocument)[]>(
    categories.includes(params.category)
      ? PRODUCTS_QUERY_BY_CATEGORY
      : PRODUCTS_QUERY,
    params,
    {
      perspective: draftMode().isEnabled ? 'previewDrafts' : 'published',
      next: { tags: ['post'], revalidate: 3600 },
    } as Pick<any, 'next' | 'perspective' | 'cache'>
  );

  if (!initial.data) {
    notFound();
  }

  return (
    <main className="relative">
      <div className="px-4 pt-24 md:px-8 lg:px-12 xl:mx-auto xl:max-w-7xl">
        <h1 className="mb-6 text-center">
          {categories.includes(params.category)
            ? textInfor[params.category].mainText
            : 'All Products'}
        </h1>
        <p className="mb-8 text-balance text-center lg:mb-12">
          {categories.includes(params.category)
            ? textInfor[params.category].text
            : 'We have everything you need'}
        </p>

        <div className="mb-8 h-[2px] w-full rounded-xl bg-gray-200 lg:mb-12"></div>
      </div>

      {draftMode().isEnabled ? (
        <ProductCardsPreview
          initial={initial}
          query={
            categories.includes(params.category)
              ? PRODUCTS_QUERY_BY_CATEGORY
              : PRODUCTS_QUERY
          }
          params={params}
        />
      ) : (
        <ProductsWithSearchBar products={initial.data} />
      )}
    </main>
  );
}
