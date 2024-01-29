import { loadQuery } from '@/sanity/lib/store';
import { withPageAuthRequired } from '@auth0/nextjs-auth0';
import { getProductsInCartFromServer } from '../_lib/getProductsInCartFromServer';
import { SanityDocument } from 'next-sanity';
import { draftMode } from 'next/headers';
import { PRODUCTS_QUERY_BASED_SLUGS } from '@/sanity/lib/queries';
import { QueryResponseInitial } from '@sanity/react-loader';
import { addProductImgUrls } from '../_lib/addProductImgUrls';

export default withPageAuthRequired(async function ShoppingCart() {
  //get products in shopping cart of the current user
  const products: ProductInShoppingCart[] | undefined =
    await getProductsInCartFromServer();

  //get product sanity documents
  const productSlugs: string[] = products
    ? products.map((product: ProductInShoppingCart) => product.productSlug)
    : [];

  const initialData: QueryResponseInitial<(SanityProduct & SanityDocument)[]> =
    await loadQuery<(SanityProduct & SanityDocument)[]>(
      PRODUCTS_QUERY_BASED_SLUGS,
      { slugArr: productSlugs },
      {
        perspective: draftMode().isEnabled ? 'previewDrafts' : 'published',
      }
    );

  const sanityProducts: (SanityProduct & SanityDocument)[] = initialData.data;

  //add img url to sanity documents
  const sanityProductsWithImgUrl: (ProductWithImgUrl & SanityDocument)[] =
    await addProductImgUrls(sanityProducts);

  console.log(sanityProductsWithImgUrl);
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
