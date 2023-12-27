import { SanityDocument } from "next-sanity";
import Image from "next/image";
import { PortableText } from "@portabletext/react";
import { builder } from "../utils/imageBuilder";
import Carousel from "./Carousel";

export default function Product({ product }: { product: SanityDocument }) {
  const { title, mainImage, body } = product;
  return (
    <main className="bg-dot-black/[0.2] m-4 sm:m-8">
      {mainImage ? (
        <div>
          <Carousel
            images={[
              builder.image(mainImage).quality(80).url(),
              builder.image(mainImage).quality(80).url(),
              builder.image(mainImage).quality(80).url(),
              builder.image(mainImage).quality(80).url(),
            ]}
          />

          <div className="hidden sm:flex sm:w-[50%] sm:flex-row sm:flex-wrap sm:gap-4">
            <Image
              className="aspect-square w-full rounded-lg shadow-md sm:w-[calc((100%-1rem)/2)]"
              src={builder.image(mainImage).quality(80).url()}
              width={300}
              height={300}
              alt="abc"
            />

            <Image
              className="aspect-square w-full rounded-lg shadow-md sm:w-[calc((100%-1rem)/2)]"
              src={builder.image(mainImage).quality(80).url()}
              width={300}
              height={300}
              alt="abc"
            />

            <Image
              className="aspect-square w-full rounded-lg shadow-md sm:w-[calc((100%-1rem)/2)]"
              src={builder.image(mainImage).quality(80).url()}
              width={300}
              height={300}
              alt="abc"
            />

            <Image
              className="aspect-square w-full rounded-lg shadow-md sm:w-[calc((100%-1rem)/2)]"
              src={builder.image(mainImage).quality(80).url()}
              width={300}
              height={300}
              alt="abc"
            />
          </div>
        </div>
      ) : null}
      {body ? <PortableText value={body} /> : null}
    </main>
  );
}
