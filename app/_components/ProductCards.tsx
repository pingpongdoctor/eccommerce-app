import { SanityDocument } from 'next-sanity';
import Link from 'next/link';
import ProductCard from './ProductCard';
import { addProductImgUrls } from '../_lib/addProductImgUrls';

export default async function ProductCards({
  products,
}: {
  products: (SanityProduct & SanityDocument)[];
}) {
  // use promise all to handle all promises at the same time to avoid waterfalls in data fetching
  const productsWithImgUrl = await addProductImgUrls(products);

  return (
    <div className="px-4 md:px-8 lg:px-12 xl:mx-auto xl:max-w-7xl">
      <div className="flex flex-col gap-8 sm:flex-row sm:flex-wrap">
        {productsWithImgUrl.length > 0 &&
          productsWithImgUrl.map(
            (product: ProductWithImgUrl & SanityDocument) => (
              <Link
                className="w-full sm:w-[calc((100%-2rem)/2)] lg:w-[calc((100%-4rem)/3)] xl:w-[calc((100%-6rem)/4)]"
                key={product._id}
                href={`/product/${product.slug.current}`}
              >
                <ProductCard product={product} />
              </Link>
            )
          )}
      </div>
    </div>
  );
}
