import { SanityDocument } from 'next-sanity';
export function addProductQuantity(
  productsWithImgUrl: (ProductWithImgUrl & SanityDocument)[],
  productsInCart: ProductInShoppingCart[]
): (ProductWithImgUrl & SanityDocument & { productQuantity: number })[] {
  try {
    const productsWithImgAndQuantity = [...productsWithImgUrl].map(
      (sanityProduct: ProductWithImgUrl & SanityDocument) => {
        for (let i = 0; i < productsInCart.length; i++) {
          if (sanityProduct.slug.current === productsInCart[i].productSlug) {
            sanityProduct.productQuantity = productsInCart[i].productQuantity;
          }
        }
        return sanityProduct as ProductWithImgUrl &
          SanityDocument & { productQuantity: number };
      }
    );

    return productsWithImgAndQuantity;
  } catch (e: any) {
    console.log('Error in addProductQuality function' + ' ' + e.message);
    return [];
  }
}
