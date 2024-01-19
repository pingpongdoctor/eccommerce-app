import { groq } from 'next-sanity';

export const PRODUCTS_QUERY = groq`*[_type == "post" && defined(slug) && defined(category) && count(images)>0] | order(_createdAt desc)`;
export const PRODUCT_QUERY = groq`*[_type == "post" && defined(slug) && defined(category) && count(images)>0 && slug.current == $slug][0]`;
export const NEW_PRODUCTS_QUERY = groq`*[_type == "post" && defined(slug) && defined(category) && count(images)>0] | order(_createdAt desc)[0..11]`;
export const FEATURED_PRODUCTS_QUERY = groq`*[_type == "post" && defined(slug) && defined(category) && count(images)>0 && featured == $featured] | order(_createdAt desc)[0...12]`;
export const PRODUCTS_QUERY_BASED_CATEGORY = groq`*[_type == "post" && count(images)>0 && category == $category] | order(_createdAt desc)`;
export const PRODUCTS_QUERY_CUSTOMER_ALSO_BUY = groq`*[_type == "post" && count(images)>0 && category == $category && slug.current != $slug] | order(_createdAt desc)[0..4]`;
export const HOMEPAGE_QUERY = groq`*[_type == "homepage"][0]`;
