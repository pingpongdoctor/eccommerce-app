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
import PreviewIntroduceComponent from './_components/PreviewIntroduceComponent';
import CategoryCards from './_components/CategoryCards';
import IncentiveComponent from './_components/IncentiveComponent';

export default async function Home() {
  const featuredProductPromise = loadQuery<(Product & SanityDocument)[]>(
    FEATURED_PRODUCTS_QUERY,
    { featured: true },
    {
      perspective: draftMode().isEnabled ? 'previewDrafts' : 'published',
    }
  );

  const trendingProductPromise = loadQuery<(Product & SanityDocument)[]>(
    NEW_PRODUCTS_QUERY,
    {},
    {
      perspective: draftMode().isEnabled ? 'previewDrafts' : 'published',
    }
  );

  const homepageContentPromise = loadQuery<HomePageData & SanityDocument>(
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

  const dataArr = [
    {
      id: '1',
      type: 'Featured Products',
      component: draftMode().isEnabled ? (
        <ProductCardsPreview initial={featuredProductData} />
      ) : (
        // use suspense to allow next.js to progressively send chunks of this page to the client side
        <Suspense fallback={<p>Loading feed...</p>}>
          <ProductCards products={featuredProductData.data} />
        </Suspense>
      ),
    },
    {
      id: '2',
      type: 'New Products',
      component: draftMode().isEnabled ? (
        <ProductCardsPreview initial={trendingProductData} />
      ) : (
        <Suspense fallback={<p>Loading feed...</p>}>
          <ProductCards products={trendingProductData.data} />
        </Suspense>
      ),
    },
    { id: '3', type: 'From Blogs', component: <BlogCards /> },
  ];

  return (
    <main>
      <HeroSection />

      {draftMode().isEnabled ? (
        <PreviewIntroduceComponent initial={homePageData} />
      ) : (
        <Suspense>
          <IntroduceComponent homePageData={homePageData.data} />
        </Suspense>
      )}

      {dataArr?.length > 0 &&
        dataArr.map((data) => (
          <div key={data.id} className="pb-8 lg:pb-16">
            <div className="mx-auto flex items-center justify-between px-4 md:px-8 lg:px-12 xl:max-w-7xl">
              <h3>{data.type}</h3>
              <p className="font-semibold text-gray-900">
                See all <span>&rarr;</span>
              </p>
            </div>
            {data.component}
          </div>
        ))}

      <div className="pb-8 lg:pb-16">
        <h3 className="mx-auto px-4 md:px-8 lg:px-12 xl:max-w-7xl">
          Browse by Category
        </h3>
        <CategoryCards />
      </div>

      <IncentiveComponent />
    </main>
  );
}
