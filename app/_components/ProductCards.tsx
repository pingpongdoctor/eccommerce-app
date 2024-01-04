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
  if (products?.length == 0) {
    return <div className="p-4 text-red-500">No products found</div>;
  }

  await Promise.all(
    products.map(async (product: SanityDocument) => {
      product.imgUrl = builder.image(product.mainImage[0]).quality(80).url();
      product.imgBase64Url = await getUrlBase64(
        builder.image(product.mainImage[0]).quality(80).url()
      );
    })
  );

  return (
    <div className="m-4 sm:m-8">
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
