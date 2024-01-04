import BlogCards from './_components/BlogCards';
import HeroSection from './_components/HeroSection';
import IntroduceSection from './_components/IntroduceSection';
import { loadQuery } from '@/sanity/lib/store';
import { FEATURED_PRODUCTS_QUERY, PRODUCTS_QUERY } from '@/sanity/lib/queries';
import { SanityDocument } from 'next-sanity';
import { draftMode } from 'next/headers';
import ProductCardsPreview from './_components/ProductCardsPreview';
import ProductCards from './_components/ProductCards';

export default async function Home() {
  const featuredProductData = await loadQuery<SanityDocument[]>(
    FEATURED_PRODUCTS_QUERY,
    { featured: true },
    { perspective: draftMode().isEnabled ? 'previewDrafts' : 'published' }
  );

  return (
    <main>
      <HeroSection />
      <IntroduceSection />
      <BlogCards />

      {/* featured products */}
      {draftMode().isEnabled ? (
        <ProductCardsPreview initial={featuredProductData} />
      ) : (
        <ProductCards products={featuredProductData.data} />
      )}
    </main>
  );
}
