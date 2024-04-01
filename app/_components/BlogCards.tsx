import BlogCard from './BlogCard';
import CarouselComponent from './CarouselComponent';
import { SanityDocument } from 'next-sanity';

interface Props {
  blogs: (SanityBlog &
    SanityDocument & {
      authorData: SanityAuthor & SanityDocument;
    } & { imageUrl: string })[];
}

export default function BlogCards({ blogs }: Props) {
  return (
    <div className="mx-auto overflow-x-hidden">
      <div className="hidden lg:block">
        <CarouselComponent
          blogs={blogs}
          carouselAutoPlaySpeed={2000}
          carouselAutoPlay={true}
        />
      </div>
      <div className="flex flex-col gap-4 bg-white px-4 md:px-8 lg:hidden">
        {blogs.length > 0 &&
          blogs.slice(0, 4).map(
            (
              blog: SanityBlog &
                SanityDocument & {
                  authorData: SanityAuthor & SanityDocument;
                } & { imageUrl: string }
            ) => <BlogCard blog={blog} key={blog._id} />
          )}
      </div>
    </div>
  );
}
