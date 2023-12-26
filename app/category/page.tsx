import { SanityDocument } from "next-sanity";
import Products from "../_components/ProductCards";
import { loadQuery } from "@/sanity/lib/store";
import { PRODUCTS_QUERY } from "@/sanity/lib/queries";
import { draftMode } from "next/headers";
import ProductCardsPreview from "../_components/ProductCardsPreview";
import { notFound } from "next/navigation";

export default async function Categories() {
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
    <ProductCardsPreview initial={initial} />
  ) : (
    <Products products={initial.data} />
  );
}
