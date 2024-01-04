import { groq } from 'next-sanity';

export const PRODUCTS_QUERY = groq`*[_type == "post" && defined(slug) && defined(category)]`;
export const FEATURED_PRODUCTS_QUERY = groq`*[_type == "post" && defined(slug) && defined(category) && featured == $featured]`;
export const PRODUCTS_QUERY_BASED_CATEGORY = groq`*[_type == "post" && category == $category]`;
export const PRODUCT_QUERY = groq`*[_type == "post" && defined(slug) && defined(category) && slug.current == $slug][0]`;
