import BlogCards from './_components/BlogCards';
import HeroSection from './_components/HeroSection';
import IntroduceSection from './_components/IntroduceSection';

export default async function Home() {
  return (
    <main>
      <HeroSection />
      <IntroduceSection />
      <BlogCards />
    </main>
  );
}
