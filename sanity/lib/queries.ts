import { groq } from 'next-sanity';

export const PRODUCTS_QUERY = groq`*[_type == "post" && defined(slug) && defined(category)] | order(_createdAt desc)`;
export const TRENDING_PRODUCTS_QUERY = groq`*[_type == "post" && defined(slug) && defined(category)] | order(_createdAt desc)[0...12]`;
export const FEATURED_PRODUCTS_QUERY = groq`*[_type == "post" && defined(slug) && defined(category) && featured == $featured] | order(_createdAt desc)[0...12]`;
export const PRODUCTS_QUERY_BASED_CATEGORY = groq`*[_type == "post" && category == $category] | order(_createdAt desc)`;
export const PRODUCT_QUERY = groq`*[_type == "post" && defined(slug) && defined(category) && slug.current == $slug][0]`;
