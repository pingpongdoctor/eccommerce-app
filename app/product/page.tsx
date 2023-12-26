import { SanityDocument } from "next-sanity";
import ProductCards from "../_components/ProductCards";
import { loadQuery } from "@/sanity/lib/store";
import { PRODUCTS_QUERY } from "@/sanity/lib/queries";
import { draftMode } from "next/headers";
import ProductsPreview from "../_components/ProductCardsPreview";
import { notFound } from "next/navigation";

export default async function Products() {
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
    <ProductCards products={initial.data} />
  );
}
