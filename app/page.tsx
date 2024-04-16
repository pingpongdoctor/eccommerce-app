import BlogCards from './_components/BlogCards';
import HeroSection from './_components/HeroSection';
import IntroduceComponent from './_components/IntroduceComponent';
import { loadQuery } from '@/sanity/lib/store';
import {
  FEATURED_PRODUCTS_QUERY,
  NEW_PRODUCTS_QUERY,
  HOMEPAGE_QUERY,
  BLOGS_QUERY,
} from '@/sanity/lib/queries';
import { SanityDocument } from 'next-sanity';
import { draftMode } from 'next/headers';
import ProductCardsPreview from './_components/ProductCardsPreview';
import ProductCards from './_components/ProductCards';
import { Suspense } from 'react';
import PreviewIntroduceComponent from './_components/PreviewIntroduceComponent';
import CategoryCards from './_components/CategoryCards';
import IncentiveComponent from './_components/IncentiveComponent';
import ProductCardsSkeleton from './_components/ProductCardsSkeleton';
import { addDetailedAuthorDataToBlogs } from './_lib/addDetailedAuthorToBlogs';
import Link from 'next/link';

export default async function Home() {
  const featuredProductPromise = loadQuery<(SanityProduct & SanityDocument)[]>(
    FEATURED_PRODUCTS_QUERY,
    { featured: true },
    {
      perspective: draftMode().isEnabled ? 'previewDrafts' : 'published',
    } as Pick<any, 'next' | 'cache' | 'perspective'>
  );

  const trendingProductPromise = loadQuery<(SanityProduct & SanityDocument)[]>(
    NEW_PRODUCTS_QUERY,
    {},
    {
      perspective: draftMode().isEnabled ? 'previewDrafts' : 'published',
    } as Pick<any, 'next' | 'cache' | 'perspective'>
  );

  const homepageContentPromise = loadQuery<HomePageData & SanityDocument>(
    HOMEPAGE_QUERY,
    {},
    {
      perspective: draftMode().isEnabled ? 'previewDrafts' : 'published',
    } as Pick<any, 'next' | 'cache' | 'perspective'>
  );

  const blogsPromise = loadQuery<(SanityBlog & SanityDocument)[]>(
    BLOGS_QUERY,
    {},
    {
      perspective: draftMode().isEnabled ? 'previewDrafts' : 'published',
    } as Pick<any, 'next' | 'cache' | 'perspective'>
  );

  // handle promises at the same time to avoid waterfall when fetching data
  const [featuredProductData, trendingProductData, homePageData, blogsData] =
    await Promise.all([
      featuredProductPromise,
      trendingProductPromise,
      homepageContentPromise,
      blogsPromise,
    ]);

  const blogsDataWithDetailedAuthorData: BlogsWithDetailedAuthorData[] =
    draftMode().isEnabled
      ? []
      : await addDetailedAuthorDataToBlogs(blogsData.data);

  const dataArr = [
    {
      id: '1',
      name: 'Featured Products',
      component: draftMode().isEnabled ? (
        <ProductCardsPreview
          initial={featuredProductData}
          params={{ featured: true }}
          query={FEATURED_PRODUCTS_QUERY}
        />
      ) : (
        // use suspense to allow next.js to progressively send chunks of this page to the client side
        <Suspense fallback={<ProductCardsSkeleton />}>
          <ProductCards products={featuredProductData.data} />
        </Suspense>
      ),
      href: '/product',
    },
    {
      id: '2',
      name: 'New Products',
      component: draftMode().isEnabled ? (
        <ProductCardsPreview
          initial={trendingProductData}
          query={NEW_PRODUCTS_QUERY}
        />
      ) : (
        <Suspense fallback={<ProductCardsSkeleton />}>
          <ProductCards products={trendingProductData.data} />
        </Suspense>
      ),
      href: '/product',
    },
    {
      id: '3',
      name: 'From Blogs',
      component: <BlogCards blogs={blogsDataWithDetailedAuthorData} />,
      href: '/blog',
    },
  ];

  return (
    <main className="*:mb-8 *:md:mb-12 *:lg:mb-20">
      <HeroSection />

      {draftMode().isEnabled ? (
        <PreviewIntroduceComponent initial={homePageData} />
      ) : (
        <IntroduceComponent homePageData={homePageData.data} />
      )}

      <div>
        <h3 className="px-4 md:px-8 lg:px-12 xl:mx-auto xl:max-w-7xl">
          Browse by Category
        </h3>
        <CategoryCards />
      </div>

      {dataArr?.length > 0 &&
        dataArr.map((data) => (
          <div key={data.id}>
            <div>
              <div className="mx-auto flex items-center justify-between px-4 md:px-8 lg:px-12 xl:max-w-7xl">
                <h3>{data.name}</h3>
                <Link
                  href={data.href}
                  className="group flex cursor-default justify-start gap-1 font-semibold text-gray-900"
                >
                  <span> See all </span>
                  <span className="transition-all duration-500 group-hover:translate-x-2">
                    &rarr;
                  </span>
                </Link>
              </div>
              {data.component}
            </div>
          </div>
        ))}

      <IncentiveComponent />
    </main>
  );
}
