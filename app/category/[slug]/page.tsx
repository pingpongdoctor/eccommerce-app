import { SanityDocument } from "next-sanity";
import { loadQuery } from "@/sanity/lib/store";
import { PRODUCTS_QUERY } from "@/sanity/lib/queries";
import { draftMode } from "next/headers";
import { notFound } from "next/navigation";
import ProductCards from "@/app/_components/ProductCards";
import ProductCardsPreview from "@/app/_components/ProductCardsPreview";

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
    <ProductCards products={initial.data} />
  );
}
