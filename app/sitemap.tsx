import { MetadataRoute } from 'next';
import { baseUrl } from './utils/baseUrl';
import { client } from '@/sanity/lib/client';
import { SanityDocument } from 'next-sanity';
import { BLOGS_QUERY, PRODUCTS_QUERY } from '@/sanity/lib/queries';
import { categories } from './utils/utils';

export default async function sitemap() {
  //get site map data of product page
  const products =
    await client.fetch<(SanityProduct & SanityDocument)[]>(PRODUCTS_QUERY);
  const productPageSiteMapData = products.map(
    (product: SanityProduct & SanityDocument) => {
      return {
        url: `${baseUrl}/product/${product.slug.current}`,
        lastModified: new Date(),
        changeFrequency: 'yearly',
        priority: 1,
      };
    }
  );

  // get site map data of category page
  const categoriesPageSiteMapData = categories.map((category) => {
    return {
      url: `${baseUrl}/category/${category}`,
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 1,
    };
  });

  //get site map data of blog page
  const blogs =
    await client.fetch<(SanityBlog & SanityDocument)[]>(BLOGS_QUERY);
  const blogPageSiteMapData = blogs.map((blog: SanityBlog & SanityDocument) => {
    return {
      url: `${baseUrl}/blog/${blog.slug.current}`,
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 1,
    };
  });

  return [
    {
      url: `${baseUrl}`,
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 1,
    },
    {
      url: `${baseUrl}/product`,
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 1,
    },
    {
      url: `${baseUrl}/shopping-cart`,
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 1,
    },
    {
      url: `${baseUrl}/order-history`,
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 1,
    },
    {
      url: `${baseUrl}/checkout`,
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 1,
    },
    {
      url: `${baseUrl}/blog`,
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 1,
    },
    ...productPageSiteMapData,
    ...categoriesPageSiteMapData,
    ...blogPageSiteMapData,
  ];
}
