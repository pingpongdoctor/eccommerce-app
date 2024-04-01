'use client';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { SanityDocument } from 'next-sanity';
import BlogCard from './BlogCard';

interface Props {
  carouselAutoPlay: boolean;
  carouselAutoPlaySpeed: number;
  carouselPauseOnHover?: boolean;
  carouselSwipeToSlide?: boolean;
  blogs: (SanityBlog &
    SanityDocument & { authorData: SanityAuthor & SanityDocument } & {
      imageUrl: string;
    })[];
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
    centerMode: true,
    row: 1,
  };

  return (
    <div className="[&>div>div>div]:flex [&>div>div>div]:gap-8 [&>div>div>div]:bg-white">
      <Slider {...settings}>
        {blogs?.length > 0 &&
          [...blogs, ...blogs].map((blog) => (
            <BlogCard key={blog._id} blog={blog} />
          ))}
      </Slider>
    </div>
  );
}
