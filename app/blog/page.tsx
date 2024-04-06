import { SanityDocument } from 'next-sanity';
import { loadQuery } from '@/sanity/lib/store';
import { BLOGS_QUERY } from '@/sanity/lib/queries';
import { draftMode } from 'next/headers';
import { notFound } from 'next/navigation';
import { addDetailedAuthorDataToBlogs } from '../_lib/addDetailedAuthorToBlogs';
import BlogCardsWithSearchBar from '../_components/BlogCardsWithSearchBar';

export default async function BlogsPage() {
  const initial = await loadQuery<(SanityBlog & SanityDocument)[]>(
    BLOGS_QUERY,
    {},
    {
      perspective: draftMode().isEnabled ? 'previewDrafts' : 'published',
      cache: 'force-cache',
      next: {},
    }
  );

  if (!initial.data) {
    notFound();
  }

  const blogsWithDetailedAuthorData = draftMode().isEnabled
    ? []
    : await addDetailedAuthorDataToBlogs(initial.data);

  return (
    <main className="relative">
      <div className="px-4 pt-24 md:px-8 lg:px-12 xl:mx-auto xl:max-w-7xl">
        <h1 className="mb-6 text-center">Search blogs you wanna read</h1>
        <div className="mb-8 h-[2px] w-full rounded-xl bg-gray-200 lg:mb-12"></div>
      </div>

      {blogsWithDetailedAuthorData.length > 0 && (
        <BlogCardsWithSearchBar blogs={blogsWithDetailedAuthorData} />
      )}
    </main>
  );
}
