import BlogCard from './_components/BlogCard';
import BlogCards from './_components/BlogCards';
import CarouselComponent from './_components/CarouselComponent';
import HeroSection from './_components/HeroSection';

export default async function Home() {
  return (
    <main className="p-4 md:p-8 lg:p-12">
      <div className="mb-16 flex h-[80dvh] w-full items-center rounded-3xl bg-[url('/assets/pexels-scott-webb-403571.jpg')] bg-cover bg-fixed bg-[50%_13%] bg-no-repeat">
        <h1 className="ml-8 font-dancingScript text-6xl">
          Welcome to the Glowy Lab Family
        </h1>
      </div>
      <HeroSection />
      <BlogCards />
    </main>
  );
}
