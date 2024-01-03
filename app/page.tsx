import BlogCards from './_components/BlogCards';
import HeroSection from './_components/HeroSection';
import IntroduceSection from './_components/IntroduceSection';
import { loadQuery } from '@/sanity/lib/store';
import { PRODUCTS_QUERY } from '@/sanity/lib/queries';
import { SanityDocument } from 'next-sanity';
import { draftMode } from 'next/headers';

export default async function Home() {
  const initial = await loadQuery<SanityDocument[]>(
    PRODUCTS_QUERY,
    {},
    { perspective: draftMode().isEnabled ? 'previewDrafts' : 'published' }
  );
  console.log(
    initial.data.map((ele) => {
      return ele.title;
    })
  );
  return (
    <main>
      <HeroSection />
      <IntroduceSection />
      <BlogCards />
    </main>
  );
}
