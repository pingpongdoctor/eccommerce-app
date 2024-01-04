import { SanityDocument } from 'next-sanity';
import Link from 'next/link';
import ProductCard from './ProductCard';

export default function ProductCards({
  products,
}: {
  products: SanityDocument[];
}) {
  if (products?.length == 0) {
    return <div className="p-4 text-red-500">No products found</div>;
  }

  return (
    <div className="m-4 sm:m-8">
      <div className="flex flex-col gap-4 sm:flex-row sm:flex-wrap sm:gap-8">
        {products?.length > 0 &&
          products.map((product) => (
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
