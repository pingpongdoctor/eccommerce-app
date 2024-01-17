import { SanityDocument, QueryParams } from 'next-sanity';
import { loadQuery } from '@/sanity/lib/store';
import {
  PRODUCTS_QUERY,
  PRODUCTS_QUERY_BASED_CATEGORY,
} from '@/sanity/lib/queries';
import { draftMode } from 'next/headers';
import { notFound } from 'next/navigation';
import ProductCards from '@/app/_components/ProductCards';
import ProductCardsPreview from '@/app/_components/ProductCardsPreview';
import { Metadata } from 'next';
import { categories } from '@/app/utils/utils';

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
  const initial = await loadQuery<(Product & SanityDocument)[]>(
    categories.includes(params.category)
      ? PRODUCTS_QUERY_BASED_CATEGORY
      : PRODUCTS_QUERY,
    params,
    {
      perspective: draftMode().isEnabled ? 'previewDrafts' : 'published',
      next: { tags: ['post'], revalidate: 3600 },
    }
  );

  if (!initial.data) {
    notFound();
  }

  return (
    <main>
      {draftMode().isEnabled ? (
        <ProductCardsPreview initial={initial} />
      ) : (
        <ProductCards products={initial.data} />
      )}
    </main>
  );
}
