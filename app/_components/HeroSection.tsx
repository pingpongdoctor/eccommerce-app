import heroImage from '../../public/assets/pexels-scott-webb-403571.jpg';
import Image from 'next/image';

export default function HeroSection() {
  return (
    <div className="px-4 md:px-8 lg:px-12 xl:mx-auto xl:max-w-7xl">
      <div className="relative xl:mx-auto xl:max-w-[74rem]">
        {/* use Next.js static image to let Next.js infer intial width and height and to allow using blurred placeholder without providing blurDataUrl */}
        <Image
          className="aspect-[1.5/1] w-full rounded-3xl bg-contain bg-center bg-no-repeat"
          src={heroImage}
          alt="hero-image"
          placeholder="blur"
          priority
        />
        <h1 className="absolute left-0 top-0 ml-4 flex h-full w-[60%] items-center text-balance font-dancingScript text-4xl sm:text-5xl md:ml-8 md:text-6xl lg:ml-12 lg:text-7xl">
          Welcome to the Glowy Lab
        </h1>
      </div>
    </div>
  );
}
