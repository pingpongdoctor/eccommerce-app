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
import CustomerReviews from '@/app/_components/CustomerReviews';

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

  if (!initialData.data) {
    notFound();
  }

  //get products that customers also buy
  const customerAlsoBuyInitialData = draftMode().isEnabled
    ? []
    : await client.fetch<(SanityProduct & SanityDocument)[]>(
        PRODUCTS_QUERY_CUSTOMER_ALSO_BUY,
        { category: initialData.data.category, slug: params.slug },
        {
          perspective: draftMode().isEnabled ? 'previewDrafts' : 'published',
          next: { tags: ['post'], revalidate: 3600 },
        }
      );

  return (
    <main className="*:mb-8 *:md:mb-12 *:lg:mb-20">
      {/* product detail */}
      {draftMode().isEnabled ? (
        <ProductDetailPreview initial={initialData} params={params} />
      ) : (
        <ProductDetail product={initialData.data} />
      )}

      {/* customer reviews */}
      <CustomerReviews productSlug={params.slug} />

      {/* product you may like */}
      <div>
        {customerAlsoBuyInitialData?.length > 0 && (
          <div className="mb-6 flex items-center justify-between px-4 md:px-8 lg:px-12 xl:mx-auto xl:max-w-7xl">
            <h3 className="mb-0">Products you may like</h3>
            <p className="group flex cursor-default justify-start gap-1 font-semibold text-gray-900">
              <span> See all </span>
              <span className="transition-all duration-500 group-hover:translate-x-2">
                &rarr;
              </span>
            </p>
          </div>
        )}

        <ProductCards products={customerAlsoBuyInitialData} />
      </div>
    </main>
  );
}
