import { SanityDocument } from 'next-sanity';
import Image from 'next/image';
import { PortableText } from '@portabletext/react';
import { builder } from '../utils/imageBuilder';
import CarouselComponent from './CarouselComponent';
import RichTextImageComponent from './RichTextImageComponent';

export default function Product({ product }: { product: SanityDocument }) {
  const { title, mainImage, body } = product;

  // const addIdNumberToImage = function (
  //   imgArr: (ImageInfor & { id?: number; imageLink?: string })[],
  // ) {
  //   let idVal = 1;
  //   for (let i = 0; i < imgArr.length; i++) {
  //     imgArr[i].id = idVal;
  //     imgArr[i].imageLink = builder.image(imgArr[i].asset).quality(80).url();
  //     idVal += 1;
  //   }
  //   return imgArr;
  // };

  return (
    <main className="m-4 bg-dot-black/[0.2] sm:m-8">
      {mainImage?.length > 0 ? (
        <div>
          <CarouselComponent />

          <ul className="hidden max-w-[700px] list-none sm:flex sm:flex-wrap sm:gap-4">
            {mainImage.map((image: ImageInfor) => {
              return (
                <li
                  key={image._key}
                  className="sm:aspect-square sm:w-[calc((100%-1rem)/2)] sm:rounded-lg sm:shadow-md"
                >
                  <Image
                    className="sm:aspect-square sm:w-full sm:rounded-lg sm:object-cover sm:shadow-md"
                    src={builder.image(image.asset).quality(80).url()}
                    width={300}
                    height={300}
                    alt={image.alt}
                  />
                </li>
              );
            })}
          </ul>
        </div>
      ) : null}
      {body ? (
        <PortableText
          value={body}
          components={{
            // ...
            types: {
              image: RichTextImageComponent,
            },
          }}
        />
      ) : null}
    </main>
  );
}
