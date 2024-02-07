import { SanityDocument } from 'next-sanity';

export function addSanityProductId(
  productsInCart: ProductInShoppingCart[],
  sanityProductsInCart: (SanityProduct & SanityDocument)[]
): (ProductInShoppingCart & {
  sanityProductId: string;
})[] {
  const productsInCartWithSanityId: (ProductInShoppingCart & {
    sanityProductId: string;
  })[] = [...productsInCart].map((productInCart: ProductInShoppingCart) => {
    for (let i = 0; i < sanityProductsInCart.length; i++) {
      if (productInCart.productSlug === sanityProductsInCart[i].slug.current) {
        productInCart.sanityProductId = sanityProductsInCart[i]._id;
      }
    }
    return productInCart as ProductInShoppingCart & {
      sanityProductId: string;
    };
  });
  return productsInCartWithSanityId;
}
