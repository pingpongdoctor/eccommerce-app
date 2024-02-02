import product from '@/sanity/schemas/product';
import { SanityDocument } from 'next-sanity';

export default function calculateSubtotal(
  sanityProduct: (SanityProduct & SanityDocument)[],
  productsInCart: ProductInShoppingCart[]
) {
  let subtotal = 0;

  sanityProduct.map((sanityProduct: SanityProduct & SanityDocument) => {
    for (let i = 0; i < productsInCart.length; i++) {
      if (sanityProduct.slug.current === productsInCart[i].productSlug) {
        subtotal +=
          Number(sanityProduct.price) * productsInCart[i].productQuantity;
      }
    }
  });
}
