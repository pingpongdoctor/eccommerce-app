import { loadQuery } from '@/sanity/lib/store';
import { withPageAuthRequired } from '@auth0/nextjs-auth0';
import { getProductsInCartFromServer } from '../_lib/getProductsInCartFromServer';
import { SanityDocument } from 'next-sanity';
import { draftMode } from 'next/headers';
import { PRODUCTS_QUERY_BASED_SLUGS } from '@/sanity/lib/queries';

export default withPageAuthRequired(async function ShoppingCart() {
  const products:
    | {
        sanitySlug: string;
      }[]
    | undefined = await getProductsInCartFromServer();

  const productSlugs = products
    ? products.map((product: { sanitySlug: string }) => product.sanitySlug)
    : [];

  const initialData = await loadQuery<(SanityProduct & SanityDocument)[]>(
    PRODUCTS_QUERY_BASED_SLUGS,
    { slugArr: productSlugs },
    {
      perspective: draftMode().isEnabled ? 'previewDrafts' : 'published',
    }
  );

  console.log(initialData.data);

  return (
    <div>
      <h2>Shopping Cart</h2>
      <div>
        {/* <Image
          className="object-fit aspect-[1/1.2] w-full rounded-xl object-cover object-center transition-all hover:opacity-90"
          src={}
          alt="product-image"
          width={300}
          height={300}
          placeholder="blur"
          blurDataURL={solidBlureDataUrl}
        /> */}
      </div>
    </div>
  );
});
