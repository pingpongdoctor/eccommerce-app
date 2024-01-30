import { SanityDocument } from 'next-sanity';
import ShoppingCartItem from './ShoppingCartItem';
import { addProductImgUrls } from '../_lib/addProductImgUrls';

interface Props {
  sanityProducts: (SanityProduct & SanityDocument)[];
  products: ProductInShoppingCart[];
}

export default async function ShoppingCartList({
  sanityProducts,
  products,
}: Props) {
  //add img url to sanity documents
  const productsWithImgUrl: (ProductWithImgUrl & SanityDocument)[] =
    await addProductImgUrls(sanityProducts);

  const productsWithImgUrlAndQuantity = [...productsWithImgUrl].map(
    (sanityProduct: ProductWithImgUrl & SanityDocument) => {
      for (let i = 0; i < products.length; i++) {
        if (sanityProduct.slug.current === products[i].productSlug) {
          sanityProduct.productQuantity = products[i].productQuantity;
        }
      }
      return sanityProduct as ProductWithImgUrl &
        SanityDocument & { productQuantity: number };
    }
  );
  return (
    <div>
      {productsWithImgUrlAndQuantity.map(
        (
          product: ProductWithImgUrl &
            SanityDocument & { productQuantity: number }
        ) => (
          <ShoppingCartItem key={product._id} product={product} />
        )
      )}
    </div>
  );
}
