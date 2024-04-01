import { SanityDocument, QueryParams } from 'next-sanity';
import { loadQuery } from '@/sanity/lib/store';
import {
  BLOGS_QUERY,
  BLOG_QUERY,
  BLOGS_QUERY_CUSTOMER_ALSO_READ,
} from '@/sanity/lib/queries';
import { draftMode } from 'next/headers';
import { client } from '@/sanity/lib/client';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import BlogComponent from '@/app/_components/BlogComponent';
import BlogPreviewComponent from '@/app/_components/BlogPreviewComponent';
import BlogCard from '@/app/_components/BlogCard';
import { addDetailedAuthorDataToBlogs } from '@/app/_lib/addDetailedAuthorToBlogs';
import Link from 'next/link';

export async function generateMetadata({
  params,
}: {
  params: QueryParams;
}): Promise<Metadata> {
  const blog = await client.fetch<SanityBlog & SanityDocument>(
    BLOG_QUERY,
    params,
    {
      next: { tags: ['blog'], revalidate: 3600 },
    }
  );

  if (!blog) {
    return {
      title: 'wrong blog id',
    };
  }

  return {
    title: blog.title,
  };
}

export async function generateStaticParams() {
  const blogs = await client.fetch<(SanityBlog & SanityDocument)[]>(
    BLOGS_QUERY,
    {},
    {
      next: { tags: ['blog'], revalidate: 3600 },
    }
  );

  return blogs.map((blog) => ({
    slug: blog.slug.current,
  }));
}

export default async function DetailedBlog({
  params,
}: {
  params: QueryParams;
}) {
  //get data for a specific blog
  const initialData = await loadQuery<SanityBlog & SanityDocument>(
    BLOG_QUERY,
    params,
    {
      perspective: draftMode().isEnabled ? 'previewDrafts' : 'published',
      next: { tags: ['blog'], revalidate: 3600 },
    }
  );

  if (!initialData?.data) {
    notFound();
  }

  //get blogs that customers also read
  const blogsCustomerAlsoReadInitialData = await loadQuery<
    (SanityBlog & SanityDocument)[]
  >(
    BLOGS_QUERY_CUSTOMER_ALSO_READ,
    { category: initialData.data.category, slug: params.slug },
    {
      perspective: draftMode().isEnabled ? 'previewDrafts' : 'published',
      next: { tags: ['blog'], revalidate: 3600 },
    }
  );

  //add detailed author data to blogs that customers also read
  const blogsCustomerAlsoReadWithDetailedAuthorData = draftMode().isEnabled
    ? []
    : await addDetailedAuthorDataToBlogs(blogsCustomerAlsoReadInitialData.data);

  return (
    <main className="*:mb-8 *:md:mb-12 *:lg:mb-20">
      {/* blog content */}
      {draftMode().isEnabled ? (
        <BlogPreviewComponent initial={initialData} params={params} />
      ) : (
        <BlogComponent blog={initialData.data} />
      )}

      {/* blogs you may also read */}
      <div>
        {blogsCustomerAlsoReadWithDetailedAuthorData.length > 0 && (
          <div className="mb-6 flex items-center justify-between px-4 md:px-8 lg:px-12 xl:mx-auto xl:max-w-7xl">
            <h3 className="mb-0">Blogs you may read</h3>
            <p className="group flex cursor-default justify-start gap-1 font-semibold text-gray-900">
              <span> See all </span>
              <span className="transition-all duration-500 group-hover:translate-x-2">
                &rarr;
              </span>
            </p>
          </div>
        )}

        <div className="flex flex-wrap justify-between gap-y-4 px-4 sm:gap-y-8 md:px-8 lg:px-12 xl:mx-auto xl:max-w-7xl">
          {blogsCustomerAlsoReadWithDetailedAuthorData.length > 0 &&
            blogsCustomerAlsoReadWithDetailedAuthorData.map(
              (
                blog: SanityBlog &
                  SanityDocument & {
                    authorData: SanityAuthor & SanityDocument;
                  } & { imageUrl: string }
              ) => (
                <Link
                  className="block w-full md:w-[calc((100%-2rem)/2)] lg:w-[calc((100%-4rem)/3)] xl:w-[calc((100%-6rem)/4)]"
                  key={blog._id}
                  href={`/blog/${blog.slug.current}`}
                >
                  {' '}
                  <BlogCard
                    blog={blog}
                    blogCardClassname="w-full sm:w-full md:w-full lg:w-full xl:w-full md:aspect-[1/1.15]"
                  />
                </Link>
              )
            )}
        </div>
      </div>
    </main>
  );
}
