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
import CustomerReviews from '@/app/_components/CustomerReviews';
import { getProductReviews } from '@/app/_lib/getProductReviews';
import { Review } from '@prisma/client';

export async function generateMetadata({
  params,
}: {
  params: QueryParams;
}): Promise<Metadata> {
  const product = await client.fetch<SanityProduct & SanityDocument>(
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
  const products = await client.fetch<(SanityProduct & SanityDocument)[]>(
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
  //get data for a specific product
  const initialData = await loadQuery<SanityProduct & SanityDocument>(
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

  //get products that customers also buy
  const customerAlsoBuyInitialData = await loadQuery<
    (SanityProduct & SanityDocument)[]
  >(
    PRODUCTS_QUERY_CUSTOMER_ALSO_BUY,
    { category: initialData.data.category, slug: params.slug },
    {
      perspective: draftMode().isEnabled ? 'previewDrafts' : 'published',
      next: { tags: ['post'], revalidate: 3600 },
    }
  );

  //get reviews
  const productReviews:
    | (Review & { user: { name: string; imgUrl: string } })[]
    | undefined = await getProductReviews(params.slug);

  return (
    <main className="*:mb-8 *:md:mb-12 *:lg:mb-20">
      {/* product detail */}
      {draftMode().isEnabled ? (
        <ProductDetailPreview initial={initialData} params={params} />
      ) : (
        <ProductDetail
          product={initialData.data}
          productReviews={productReviews}
        />
      )}

      {/* customer reviews */}

      <CustomerReviews
        productReviews={
          productReviews?.sort(
            (
              a: Review & { user: { name: string; imgUrl: string } },
              b: Review & { user: { name: string; imgUrl: string } }
            ) =>
              new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
          ) || []
        }
        productSlug={params.slug}
      />

      {/* product you may like */}
      <div>
        {customerAlsoBuyInitialData?.data?.length > 0 && (
          <div className="mx-auto mb-6 flex items-center justify-between px-4 md:px-8 lg:px-12 xl:max-w-7xl">
            <h3 className="mb-0">Products you may like</h3>
            <p className="font-semibold text-gray-900">
              See all <span>&rarr;</span>
            </p>
          </div>
        )}

        {draftMode().isEnabled ? (
          <ProductCardsPreview initial={customerAlsoBuyInitialData} />
        ) : (
          <ProductCards products={customerAlsoBuyInitialData.data} />
        )}
      </div>
    </main>
  );
}
