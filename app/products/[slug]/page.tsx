import { SanityDocument, QueryParams } from "next-sanity";
import Product from "@/app/_components/Product";
import { loadQuery } from "@/sanity/lib/store";
import { PRODUCT_QUERY, PRODUCTS_QUERY } from "@/sanity/lib/queries";
import { draftMode } from "next/headers";
import ProductPreview from "@/app/_components/ProductPreview";
import { client } from "@/sanity/lib/client";
import { Metadata } from "next";
import { notFound } from "next/navigation";

export async function generateMetadata({
  params,
}: {
  params: QueryParams;
}): Promise<Metadata> {
  const product = await client.fetch<SanityDocument>(PRODUCT_QUERY, params);

  if (!product) {
    return {
      title: "wrong product id",
    };
  }

  return {
    title: product.title,
  };
}

export async function generateStaticParams() {
  const products = await client.fetch<SanityDocument[]>(PRODUCTS_QUERY);

  return products.map((product) => ({
    slug: product.slug.current,
  }));
}

export default async function ProductPage({ params }: { params: QueryParams }) {
  const initial = await loadQuery<SanityDocument>(PRODUCT_QUERY, params, {
    perspective: draftMode().isEnabled ? "previewDrafts" : "published",
  });

  if (!initial.data) {
    notFound();
  }

  return draftMode().isEnabled ? (
    <ProductPreview initial={initial} params={params} />
  ) : (
    <Product product={initial.data} />
  );
}
