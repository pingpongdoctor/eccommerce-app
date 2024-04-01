import { AUTHOR_QUERY } from '@/sanity/lib/queries';
import { SanityDocument } from 'next-sanity';
import { builder } from '../utils/imageBuilder';
import { client } from '@/sanity/lib/client';

export async function addDetailedAuthorDataToBlogs(
  blogs: (SanityBlog & SanityDocument)[]
): Promise<
  (SanityBlog &
    SanityDocument & {
      authorData: SanityAuthor & SanityDocument;
    } & { imageUrl: string })[]
> {
  try {
    const blogsDataWithDetailedAuthor: (SanityBlog &
      SanityDocument & {
        authorData: SanityAuthor & SanityDocument;
      } & { imageUrl: string })[] = await Promise.all(
      blogs.map(async (blog: SanityBlog & SanityDocument) => {
        const authorData: SanityAuthor & SanityDocument = await client.fetch<
          SanityAuthor & SanityDocument
        >(AUTHOR_QUERY, {
          id: blog.author._ref,
        });

        blog.authorData = authorData;
        blog.imageUrl = builder.image(blog.image).quality(80).url();

        return blog as SanityBlog &
          SanityDocument & {
            authorData: SanityAuthor & SanityDocument;
          } & { imageUrl: string };
      })
    );

    return blogsDataWithDetailedAuthor;
  } catch (e: any) {
    console.log('Error in addProductImgUrls function' + e);
    return [];
  }
}
