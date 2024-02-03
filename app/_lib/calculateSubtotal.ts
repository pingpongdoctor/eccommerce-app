import product from '@/sanity/schemas/product';
import { SanityDocument } from 'next-sanity';

export function calculateSubtotal(
  productsInCart: ProductInShoppingCart[],
  sanityProduct: (SanityProduct & SanityDocument)[]
): number {
  try {
    let subtotal = 0;

    sanityProduct.map((sanityProduct: SanityProduct & SanityDocument) => {
      for (let i = 0; i < productsInCart.length; i++) {
        if (sanityProduct.slug.current === productsInCart[i].productSlug) {
          subtotal +=
            Number(sanityProduct.price) * productsInCart[i].productQuantity;
        }
      }
    });

    return subtotal;
  } catch (e: any) {
    console.log('Error in calculateSubtotal function' + ' ' + e.message);
    return 0;
  }
}
