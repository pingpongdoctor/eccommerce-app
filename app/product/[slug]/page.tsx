import { SanityDocument, QueryParams } from 'next-sanity';
import ProductDetail from '@/app/_components/ProductDetail';
import { loadQuery } from '@/sanity/lib/store';
import {
  PRODUCT_QUERY,
  PRODUCTS_QUERY,
  PRODUCTS_QUERY_CUSTOMER_ALSO_BUY,
} from '@/sanity/lib/queries';
import { draftMode } from 'next/headers';
import ProductDetailPreview from '@/app/_components/ProductDetailPreview';
import { client } from '@/sanity/lib/client';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import ProductCards from '@/app/_components/ProductCards';
import ProductCardsPreview from '@/app/_components/ProductCardsPreview';

export async function generateMetadata({
  params,
}: {
  params: QueryParams;
}): Promise<Metadata> {
  const product = await client.fetch<Product & SanityDocument>(
    PRODUCT_QUERY,
    params,
    {
      next: { tags: ['post'], revalidate: 3600 },
    }
  );

  if (!product) {
    return {
      title: 'wrong product id',
    };
  }

  return {
    title: product.title,
  };
}

export async function generateStaticParams() {
  const products = await client.fetch<(Product & SanityDocument)[]>(
    PRODUCTS_QUERY,
    {},
    {
      next: { tags: ['post'], revalidate: 3600 },
    }
  );

  return products.map((product) => ({
    slug: product.slug.current,
  }));
}

export default async function DetailedProduct({
  params,
}: {
  params: QueryParams;
}) {
  const initialData = await loadQuery<Product & SanityDocument>(
    PRODUCT_QUERY,
    params,
    {
      perspective: draftMode().isEnabled ? 'previewDrafts' : 'published',
      next: { tags: ['post'], revalidate: 3600 },
    }
  );

  if (!initialData?.data) {
    notFound();
  }

  const customerAlsoBuyInitialData = await loadQuery<
    (Product & SanityDocument)[]
  >(
    PRODUCTS_QUERY_CUSTOMER_ALSO_BUY,
    { category: initialData.data.category, slug: params.slug },
    {
      perspective: draftMode().isEnabled ? 'previewDrafts' : 'published',
      next: { tags: ['post'], revalidate: 3600 },
    }
  );

  console.log(customerAlsoBuyInitialData.data);

  return (
    <main>
      {draftMode().isEnabled ? (
        <ProductDetailPreview initial={initialData} params={params} />
      ) : (
        <ProductDetail product={initialData.data} />
      )}

      {draftMode().isEnabled ? (
        <ProductCardsPreview initial={customerAlsoBuyInitialData} />
      ) : (
        <ProductCards products={customerAlsoBuyInitialData.data} />
      )}
    </main>
  );
}
