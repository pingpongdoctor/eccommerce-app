import { SanityDocument } from 'next-sanity';
import Link from 'next/link';
import ProductCard from './ProductCard';
import { getUrlBase64 } from '../_lib/getUrlBase64';
import { builder } from '../utils/imageBuilder';

export default async function ProductCards({
  products,
}: {
  products: SanityDocument[];
}) {
  if (products?.length === 0) {
    return <div className="p-4 text-red-500">No products found</div>;
  }

  // use promise all to handle all promises at the same time to avoid waterfalls in data fetching
  await Promise.all(
    products.map(async (product: SanityDocument) => {
      product.imgUrl = builder.image(product.mainImage[0]).quality(80).url();
      // product.imgBase64Url = await getUrlBase64(
      //   builder.image(product.mainImage[0]).quality(80).url()
      // );
    })
  );

  return (
    <div className="px-4 md:px-8 lg:px-12 xl:mx-auto xl:max-w-7xl">
      <div className="flex flex-col gap-4 sm:flex-row sm:flex-wrap sm:gap-8">
        {products.map((product) => (
          <Link
            className="inline-block w-full sm:w-[calc((100%-2rem)/2)] lg:w-[calc((100%-4rem)/3)] xl:w-[calc((100%-6rem)/4)]"
            key={product._id}
            href={`/product/${product.slug.current}`}
          >
            <ProductCard product={product} />
          </Link>
        ))}
      </div>
    </div>
  );
}
