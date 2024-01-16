import BlogCards from './_components/BlogCards';
import HeroSection from './_components/HeroSection';
import IntroduceComponent from './_components/IntroduceComponent';
import { loadQuery } from '@/sanity/lib/store';
import {
  FEATURED_PRODUCTS_QUERY,
  NEW_PRODUCTS_QUERY,
  HOMEPAGE_QUERY,
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
    }
  );

  const trendingProductPromise = loadQuery<SanityDocument[]>(
    NEW_PRODUCTS_QUERY,
    {},
    {
      perspective: draftMode().isEnabled ? 'previewDrafts' : 'published',
    }
  );

  const homepageContentPromise = loadQuery<SanityDocument[]>(
    HOMEPAGE_QUERY,
    {},
    {
      perspective: draftMode().isEnabled ? 'previewDrafts' : 'published',
    }
  );

  // handle promises at the same time to avoid waterfall when fetching data
  const [featuredProductData, trendingProductData, homePageData] =
    await Promise.all([
      featuredProductPromise,
      trendingProductPromise,
      homepageContentPromise,
    ]);

  console.log(homePageData.data[0]);

  return (
    <main>
      <HeroSection />

      <IntroduceComponent introContent={homePageData.data[0].introcontent} />

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
