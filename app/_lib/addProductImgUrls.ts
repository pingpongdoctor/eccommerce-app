import { builder } from '../utils/imageBuilder';
import { SanityDocument } from 'next-sanity';

export async function addProductImgUrls(
  products: (SanityProduct & SanityDocument)[]
): Promise<(ProductWithImgUrl & SanityDocument)[]> {
  try {
    const productsWithImgUrl: (ProductWithImgUrl & SanityDocument)[] =
      await Promise.all(
        products.map(async (product: SanityProduct & SanityDocument) => {
          product.imgUrl = builder.image(product.images[0]).quality(80).url();
          return product as ProductWithImgUrl & SanityDocument;
        })
      );

    return productsWithImgUrl;
  } catch (e: any) {
    console.log('Error in addProductImgUrls function' + ' ' + e.message);
    return [];
  }
}
