'use client';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { SanityDocument } from 'next-sanity';
import BlogCard from './BlogCard';
import Link from 'next/link';

interface Props {
  carouselAutoPlay: boolean;
  carouselAutoPlaySpeed: number;
  carouselPauseOnHover?: boolean;
  carouselSwipeToSlide?: boolean;
  blogs: BlogsWithDetailedAuthorData[];
}

export default function CarouselComponent({
  carouselAutoPlay,
  carouselAutoPlaySpeed,
  carouselPauseOnHover = true,
  carouselSwipeToSlide = true,
  blogs,
}: Props) {
  var settings = {
    dots: false,
    infinite: true,
    autoplay: carouselAutoPlay,
    autoplaySpeed: carouselAutoPlaySpeed,
    pauseOnHover: carouselPauseOnHover,
    swipeToSlide: carouselSwipeToSlide,
    slidesToShow: 4,
    slidesToScroll: 1,
    centerMode: false,
    row: 1,
  };

  return (
    <div className="xl:mx-auto xl:max-w-7xl [&>div>div>div]:flex [&>div>div>div]:gap-8 [&>div>div>div]:bg-white">
      <Slider {...settings}>
        {blogs?.length > 0 &&
          blogs.map((blog) => (
            <Link key={blog._id} href={`/blog/${blog.slug.current}`}>
              <BlogCard blog={blog} />
            </Link>
          ))}
      </Slider>
    </div>
  );
}
