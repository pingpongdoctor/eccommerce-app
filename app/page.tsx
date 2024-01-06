import BlogCards from './_components/BlogCards';
import HeroSection from './_components/HeroSection';
import IntroduceSection from './_components/IntroduceSection';
import { loadQuery } from '@/sanity/lib/store';
import {
  FEATURED_PRODUCTS_QUERY,
  TRENDING_PRODUCTS_QUERY,
} from '@/sanity/lib/queries';
import { SanityDocument } from 'next-sanity';
import { draftMode } from 'next/headers';
import ProductCardsPreview from './_components/ProductCardsPreview';
import ProductCards from './_components/ProductCards';
import { Suspense } from 'react';

export default async function Home() {
  const featuredProductPromise = loadQuery<SanityDocument[]>(
    FEATURED_PRODUCTS_QUERY,
    { featured: true },
    {
      perspective: draftMode().isEnabled ? 'previewDrafts' : 'published',
      next: { revalidate: 3600, tags: ['post'] },
    }
  );

  const trendingProductPromise = loadQuery<SanityDocument[]>(
    TRENDING_PRODUCTS_QUERY,
    {},
    {
      perspective: draftMode().isEnabled ? 'previewDrafts' : 'published',
      next: { revalidate: 3600, tags: ['post'] },
    }
  );

  // handle promises at the same time to avoid waterfall when fetching data
  const [featuredProductData, trendingProductData] = await Promise.all([
    featuredProductPromise,
    trendingProductPromise,
  ]);

  return (
    <main>
      <HeroSection />
      <IntroduceSection />
      <BlogCards />

      <div>
        <h3 className="mx-auto px-4 md:px-8 lg:px-12 xl:max-w-7xl">
          Featured Products
        </h3>

        {draftMode().isEnabled ? (
          <ProductCardsPreview initial={featuredProductData} />
        ) : (
          // use suspense to allow next.js to progressively send chunks of this page to the client side
          // reduce server response time from 1400 ms to less than 200 ms (tested with Google lighthouse)
          <Suspense fallback={<p>Loading feed...</p>}>
            <ProductCards products={featuredProductData.data} />
          </Suspense>
        )}
      </div>

      <div>
        <h3 className="mx-auto px-4 md:px-8 lg:px-12 xl:max-w-7xl">
          Trending Products
        </h3>

        {draftMode().isEnabled ? (
          <ProductCardsPreview initial={trendingProductData} />
        ) : (
          <Suspense fallback={<p>Loading feed...</p>}>
            <ProductCards products={trendingProductData.data} />
          </Suspense>
        )}
      </div>
    </main>
  );
}
