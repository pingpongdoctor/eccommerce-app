import { groq } from "next-sanity";

export const PRODUCTS_QUERY = groq`*[_type == "post" && defined(slug)]`;

export const PRODUCT_QUERY = groq`*[_type == "post" && slug.current == $slug][0]`;
