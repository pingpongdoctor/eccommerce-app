import { SanityDocument } from 'next-sanity';
import Image from 'next/image';
import { PortableText } from '@portabletext/react';
import { builder } from '../utils/imageBuilder';

export default function Product({ product }: { product: SanityDocument }) {
  const { title, images, body } = product;

  return (
    <main className="m-4 bg-dot-black/[0.2] sm:m-8">
      <h1>{title}</h1>
      {images?.length > 0 ? (
        <div>
          <div className="max-w-[700px] list-none sm:flex sm:flex-wrap sm:gap-4">
            {images.map((image: ImageInfor) => {
              return (
                <Image
                  className="sm:aspect-square sm:w-[calc((100%-1rem)/2)] sm:rounded-lg sm:object-cover sm:shadow-md"
                  src={builder.image(image).quality(80).url()}
                  width={300}
                  height={300}
                  alt={image.alt}
                  priority={true}
                  key={image._key}
                />
              );
            })}
          </div>
        </div>
      ) : null}
      {body ? <PortableText value={body} /> : null}
    </main>
  );
}
