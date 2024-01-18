'use client';

import { SanityDocument } from 'next-sanity';
import Link from 'next/link';
import ClientProductCard from './ClientProductCard';
import { builder } from '../utils/imageBuilder';
import { useEffect, useState } from 'react';

export default function ClientProductCards({
  products,
}: {
  products: (Product & SanityDocument)[];
}) {
  const [productsWithImgUrl, setProductsWithImgUrl] = useState<
    (ProductWithImgUrl & SanityDocument)[]
  >([]);

  // use promise all to handle all promises at the same time to avoid waterfalls in data fetching
  useEffect(() => {
    Promise.all(
      products.map(async (product: Product & SanityDocument) => {
        product.imgUrl = builder.image(product.images[0]).quality(80).url();
        return product as ProductWithImgUrl & SanityDocument;
      })
    ).then((data: (ProductWithImgUrl & SanityDocument)[]) => {
      setProductsWithImgUrl(data);
    });
  }, [products]);

  if (productsWithImgUrl?.length > 0) {
    return (
      <div className="px-4 md:px-8 lg:px-12 xl:mx-auto xl:max-w-7xl">
        <div className="flex flex-col gap-4 sm:flex-row sm:flex-wrap sm:gap-8">
          {productsWithImgUrl.map(
            (product: ProductWithImgUrl & SanityDocument) => (
              <Link
                className="inline-block w-full sm:w-[calc((100%-2rem)/2)] lg:w-[calc((100%-4rem)/3)] xl:w-[calc((100%-6rem)/4)]"
                key={product._id}
                href={`/product/${product.slug.current}`}
              >
                <ClientProductCard product={product} />
              </Link>
            )
          )}
        </div>
      </div>
    );
  } else {
    return <div className="p-4 text-red-500">No products found</div>;
  }
}
