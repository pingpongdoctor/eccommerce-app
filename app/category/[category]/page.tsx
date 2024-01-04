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
  if (!categories.includes(params.slug)) {
    return {
      title: 'All products',
    };
  }

  return {
    title: params.slug + 'products',
  };
}

export async function generateStaticParams() {
  return categories.map((category) => ({
    slug: category,
  }));
}

export default async function Category({ params }: { params: QueryParams }) {
  const initial = await loadQuery<SanityDocument[]>(
    categories.includes(params.slug)
      ? PRODUCTS_QUERY_BASED_CATEGORY
      : PRODUCTS_QUERY,
    params,
    {
      perspective: draftMode().isEnabled ? 'previewDrafts' : 'published',
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
