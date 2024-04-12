import { builder } from '../utils/imageBuilder';
import { SanityDocument } from 'next-sanity';

export function addProductImgUrls(
  products: (SanityProduct & SanityDocument)[]
): (ProductWithImgUrl & SanityDocument)[] {
  try {
    const productsWithImgUrl: (ProductWithImgUrl & SanityDocument)[] = [
      ...products,
    ].map((product: SanityProduct & SanityDocument) => {
      product.imgUrl = builder.image(product.images[0]).quality(80).url();
      return product as ProductWithImgUrl & SanityDocument;
    });

    return productsWithImgUrl;
  } catch (e: any) {
    console.log('Error in addProductImgUrls function' + ' ' + e);
    return [];
  }
}
