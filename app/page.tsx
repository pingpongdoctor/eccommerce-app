import BlogCards from './_components/BlogCards';
import HeroSection from './_components/HeroSection';
import IntroduceSection from './_components/IntroduceSection';

export default async function Home() {
  return (
    <main className="p-4 md:p-8 lg:p-12">
      <HeroSection />
      <IntroduceSection />
      <BlogCards />
    </main>
  );
}
