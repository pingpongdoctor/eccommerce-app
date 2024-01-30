import { loadQuery } from '@/sanity/lib/store';
import { withPageAuthRequired } from '@auth0/nextjs-auth0';
import { getProductsInCartFromServer } from '../_lib/getProductsInCartFromServer';
import { SanityDocument } from 'next-sanity';
import { draftMode } from 'next/headers';
import { PRODUCTS_QUERY_BASED_SLUGS } from '@/sanity/lib/queries';
import { QueryResponseInitial } from '@sanity/react-loader';
import ShoppingCartList from '../_components/ShoppingCartList';

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

  console.log(sanityProducts);
  return (
    <div>
      <h2>Shopping Cart</h2>
      <ShoppingCartList products={sanityProducts} />
    </div>
  );
});
