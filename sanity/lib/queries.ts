import { groq } from 'next-sanity';

export const PRODUCTS_QUERY = groq`*[_type == "post" && defined(slug) && defined(category) && count(images)>0] | order(_updatedAt desc)`;
export const PRODUCTS_QUERY_BY_SLUGS = groq`*[_type == "post" && defined(slug) && defined(category) && count(images)>0 && slug.current in $slugArr]`;
export const PRODUCT_QUERY = groq`*[_type == "post" && defined(slug) && defined(category) && count(images)>0 && slug.current == $slug][0]`;
export const NEW_PRODUCTS_QUERY = groq`*[_type == "post" && defined(slug) && defined(category) && count(images)>0] | order(_updatedAt desc)[0...12]`;
export const FEATURED_PRODUCTS_QUERY = groq`*[_type == "post" && defined(slug) && defined(category) && count(images)>0 && featured == $featured] | order(_updatedAt desc)[0...12]`;
export const PRODUCTS_QUERY_BY_CATEGORY = groq`*[_type == "post" && count(images)>0 && category == $category] | order(_updatedAt desc)`;
export const PRODUCTS_QUERY_CUSTOMER_ALSO_BUY = groq`*[_type == "post" && count(images)>0 && category == $category && slug.current != $slug] | order(_updatedAt desc)[0...4]`;
export const PRODUCTS_QUERY_CUSTOMER_ALSO_BUY_IN_CART_PAGE = groq`*[_type == "post" && count(images)>0 && category in $categoryArr && !(slug.current in $slugArr)] | order(_updatedAt desc)[0...4]`;
export const HOMEPAGE_QUERY = groq`*[_type == "homepage"][0]`;

export const BLOG_QUERY = groq`*[_type == "blog" && defined(slug) && defined(category) && slug.current == $slug][0]`;
export const BLOGS_QUERY = groq`*[_type == "blog" && defined(slug) && defined(category)] | order(_updatedAt desc)`;
export const BLOGS_QUERY_CUSTOMER_ALSO_READ = groq`*[_type == "blog" && category == $category && slug.current != $slug] | order(_updatedAt desc)[0...10]`;

export const AUTHOR_QUERY = groq`*[_type == "author" && defined(slug) && _id == $id][0]`;
