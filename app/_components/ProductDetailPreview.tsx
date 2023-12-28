"use client";

import { PRODUCT_QUERY } from "@/sanity/lib/queries";
import { QueryResponseInitial, useQuery } from "@sanity/react-loader";
import { QueryParams, SanityDocument } from "next-sanity";

import ProductDetail from "./ProductDetail";

export default function ProductPreview({
  initial,
  params,
}: {
  initial: QueryResponseInitial<SanityDocument>;
  params: QueryParams;
}) {
  const { data } = useQuery<SanityDocument | null>(PRODUCT_QUERY, params, {
    initial,
  });

  return data ? (
    <ProductDetail product={data} />
  ) : (
    <div className="bg-red-100">No product found</div>
  );
}
