import { SanityDocument } from 'next-sanity';
import Link from 'next/link';
import ProductCard from './ProductCard';
import { builder } from '../utils/imageBuilder';

export default async function ProductCards({
  products,
}: {
  products: (Product & SanityDocument)[];
}) {
  // use promise all to handle all promises at the same time to avoid waterfalls in data fetching
  const productsWithImgUrl = await Promise.all(
    products.map(async (product: Product & SanityDocument) => {
      product.imgUrl = builder.image(product.images[0]).quality(80).url();
      return product as ProductWithImgUrl & SanityDocument;
    })
  );

  return (
    <div className="px-4 md:px-8 lg:px-12 xl:mx-auto xl:max-w-7xl">
      <div className="flex flex-col gap-8 sm:flex-row sm:flex-wrap">
        {productsWithImgUrl?.length > 0 &&
          productsWithImgUrl.map(
            (product: ProductWithImgUrl & SanityDocument) => (
              <Link
                className="w-full sm:w-[calc((100%-2rem)/2)] lg:w-[calc((100%-4rem)/3)] xl:w-[calc((100%-6rem)/4)]"
                key={product._id}
                href={`/product/${product.slug.current}`}
              >
                {/* use suspense to allow next.js to progressively send chunks of this page to the client side */}
                <ProductCard product={product} />
              </Link>
            )
          )}
      </div>
    </div>
  );
}
