import { client } from '@/sanity/lib/client';
import { PRODUCT_QUERY } from '@/sanity/lib/queries';
import { SanityDocument } from 'next-sanity';

export async function addDetailedProductDataToOrders(
  orders: OrderWithProductSlugs[]
): Promise<OrderWithProductSlugs[]> {
  try {
    const ordersWithDetailedProducts = await Promise.all(
      [...orders].map(async (order) => {
        for (let i = 0; i < order.products.length; i++) {
          const sanityProduct: SanityProduct & SanityDocument =
            await client.fetch<SanityProduct & SanityDocument>(PRODUCT_QUERY, {
              slug: order.products[i].product.sanitySlug,
            });

          //notify if there is not title or image available data for a product
          if (!sanityProduct?.title || !sanityProduct?.images[0]) {
            console.log('image or title not found for' + sanityProduct.title);
            continue;
          }

          //add new fields if title and image are available
          order.products[i].product.title = sanityProduct.title;
          order.products[i].product.image = sanityProduct.images[0];
        }

        return order;
      })
    );

    return ordersWithDetailedProducts;
  } catch (e: any) {
    console.log('Error in addDetailedProductDataToOrders' + e);
    return [];
  }
}
