"use client";

import { PRODUCTS_QUERY } from "@/sanity/lib/queries";
import { QueryResponseInitial, useQuery } from "@sanity/react-loader";
import { SanityDocument } from "next-sanity";

import Products from "./Products";

export default function ProductsPreview({
  initial,
}: {
  initial: QueryResponseInitial<SanityDocument[]>;
}) {
  const { data } = useQuery<SanityDocument[] | null>(
    PRODUCTS_QUERY,
    {},
    { initial },
  );

  return data ? (
    <Products products={data} />
  ) : (
    <div className="bg-red-100">No products found</div>
  );
}
