import { SanityDocument } from "next-sanity";
import Products from "../_components/Products";
import { loadQuery } from "@/sanity/lib/store";
import { PRODUCTS_QUERY } from "@/sanity/lib/queries";
import { draftMode } from "next/headers";
import ProductsPreview from "../_components/ProductsPreview";
import { notFound } from "next/navigation";

export default async function ProductsPage() {
  const initial = await loadQuery<SanityDocument[]>(
    PRODUCTS_QUERY,
    {},
    {
      perspective: draftMode().isEnabled ? "previewDrafts" : "published",
    },
  );

  if (!initial.data) {
    notFound();
  }

  return draftMode().isEnabled ? (
    <ProductsPreview initial={initial} />
  ) : (
    <Products products={initial.data} />
  );
}
