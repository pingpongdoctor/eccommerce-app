import { client } from '@/sanity/lib/client';
import { PRODUCT_QUERY } from '@/sanity/lib/queries';
import { SanityDocument } from 'next-sanity';
import { builder } from '../utils/imageBuilder';
import { notify } from '../_components/ReactToastifyProvider';

export async function addDetailedProductDataToOrders(
  orders: Order[]
): Promise<OrderWithDetailedProducts[]> {
  try {
    const ordersWithDetailedProducts = await Promise.all(
      [...orders].map(async (order) => {
        for (let i = 0; i < order.products.length; i++) {
          const sanityProduct: SanityProduct & SanityDocument =
            await client.fetch<SanityProduct & SanityDocument>(PRODUCT_QUERY, {
              slug: order.products[i].product.sanitySlug,
            });

          //notify if there is not image or description available data for a product
          if (!sanityProduct?.images[0] || !sanityProduct.detail) {
            notify(
              'error',
              'image or title or description not found for' +
                sanityProduct.title,
              'missing-data'
            );
            order.products = [];
            break;
          }

          //add image url and description
          order.products[i].product.description = sanityProduct.detail;
          order.products[i].product.imgUrl = builder
            .image(sanityProduct.images[0])
            .quality(80)
            .url();
        }

        return order;
      })
    );

    return ordersWithDetailedProducts as OrderWithDetailedProducts[];
  } catch (e: any) {
    console.log('Error in addDetailedProductDataToOrders' + e);
    return [];
  }
}
